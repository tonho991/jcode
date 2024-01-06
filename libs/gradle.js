
const axios = require('axios');
const cheerio = require('cheerio');

const repositories = [
        'https://dl.google.com/android/maven2/',
        'https://repo1.maven.org/maven2/',
        'https://jfrog.com/',
        'https://jitpack.io/',
        'https://repo.spring.io/plugins-release/',
        'https://jcenter.bintray.com/',
];

async function search(data, usePom) {
        const { groupId, artifactId, version } = data;

        for (const repository of repositories) {
                var dependency = await findDependency(repository, groupId, artifactId, version, 'jar', usePom);
                if (!dependency) {
                        dependency = await findDependency(repository, groupId, artifactId, version, 'aar', usePom);
                }

                if (dependency) return dependency;
        }
        return null;
}

async function searchSubs(subs, usePom) {
        return new Promise(async function(resolve, reject) {
                try {
                        const subs_dl = [];
                        const sublibs = [];
                        var subsAdded = [];

                        for (const sub of subs) {
                                const dependency = await search(sub, usePom);

                                subsAdded.push(dependency.download);
                                if (dependency && dependency.download) {
                                        subs_dl.push(dependency.download);
                                }
                                if (dependency && dependency.dependencies && !subsAdded.includes(dependency.dependencies.artifactId + dependency.dependencies.groupId)) {
                                        subsAdded.push(dependency.dependencies.artifactId + dependency.dependencies.groupId)
                                        sublibs.push(...dependency.dependencies);
                                }

                        }
                        resolve({
                                subsdl: subs_dl,
                                sublibs
                        });
                } catch (e) {
                        resolve([]);
                }
        })

}


async function findDependency(baseUrl, groupId, artifactId, version, ext, usePom) {
        const url = `${baseUrl}${groupId.replace(/\./g, '/')}/${artifactId}/${version}/${artifactId}-${version}.${ext}`;

        try {
                const response = await axios.get(url);
                const respData = response.data;
                if (respData.includes("html")) return null;
                if (response.status === 200) {
                        const download = response.request.res.responseUrl;
                        if (usePom) {
                                const dependencies = await getDependencies(baseUrl, groupId, artifactId, version);
                                return {
                                        download,
                                        dependencies,
                                };
                        } else {
                                return download;
                        }
                }
        } catch (error) {
        }
        return null;
}

async function getDependencies(baseUrl, groupId, artifactId, version) {
        const url = `${baseUrl}${groupId.replace(/\./g, '/')}/${artifactId}/${version}/${artifactId}-${version}.pom`;
        const dependencies = [];
        try {
                const response = await axios.get(url);
                const $ = cheerio.load(response.data, { xmlMode: true });
                $('dependency').each((index, element) => {
                        if ($(element).find('scope').text().trim() !== "compile") return;
                        const groupId = $(element).find('groupId').text().trim();
                        const artifactId = $(element).find('artifactId').text().trim();
                        const version = $(element).find('version').text().trim().replace('[', '').replace(']', '');
                        const type = $(element).find('type').text().trim();

                        dependencies.push({ groupId, artifactId, version, type, subs: true });
                });
        } catch (e) {
        }

        return dependencies;
}

module.exports = {
        search,
        searchSubs,
};