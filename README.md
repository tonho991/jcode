# JCode
Find Gradle Libraries

## 📜 Suports 
  - Google Maven
  - Maven2
  - JFrog
  - JitPack
  - Spring
  - JCenter

## 📥 Install & Run

- Download repo

```
git clone ttps://github.com/tonho991/jcode
```

- Run

```
npm run start
```

## 📔 API Docs

### Endpoints 
  #### Search Dependencie
  - URL: ```/api/search-lib```
  - Method: POST
  - Params
    ```json
    {
     "groupId": "com.google.android.exoplayer",
     "artifactId": "exoplayer",
     "version": "2.19.1"
    }
    ```
  - Response
    <details>
      <summary>Expand</summary>
      
      ```json
       {
        "status": "ok",
        "data": {
            "download": "https://dl.google.com/android/maven2/com/google/android/exoplayer/exoplayer/2.19.1/exoplayer-2.19.1.aar",
            "dependencies": [
              {
                "groupId": "com.google.android.exoplayer",
                "artifactId": "exoplayer-common",
                "version": "2.19.1",
                "type": "aar",
                "subs": true  
              },
              ...
            ]
         }
       }
      ```
    </details>
    
   <br/>
   
  #### Search Sub Dependencies
  - URL: ```/api/search-subs```
  - Method: POST
  - Params
    ```json
    {
      "dependencies": [
        {
          "groupId": "com.google.android.exoplayer",
          "artifactId": "exoplayer-common",
          "version": "2.19.1",
          "type": "aar",
          "subs": true  
        },
        ...
      ]
    }
    ```
  - Response
  <details>
     <summary>Expand</summary>
  
  ```json
  {
    "status": "ok",
    "data": {
      "subsdl": [
        "https://dl.google.com/android/maven2/com/google/android/exoplayer/exoplayer-common/2.19.1/exoplayer-common-2.19.1.aar",
        ...
      ],
      "sublibs": []
    }
  }
 ```
 </details>

 ## ⚖️ License
 [MIT](https://github.com/tonho991/jcode/tree/master?tab=MIT-1-ov-file)
