# JCode
Find Gradle Libraries

## 📜 Supports 
  - Google Maven
  - Maven2
  - JFrog
  - JitPack
  - Spring
  - JCenter

## 📥 Install & Run

- Download the repositorie:

```sh
git clone https://github.com/tonho991/jcode
```

- Run:

```sh
npm run start
```

## 📔 API Docs

### Endpoints 
  #### Search Dependency
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
