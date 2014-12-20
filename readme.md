

## 執行前確認事項

需建 symlink

```
$ cd Project/Server App/
$ ln -s ~/temp/fullstack hackathon/Project/ClientApp/build client
```

此步驟是將 ClientApp/build 下建立好的檔案 link 到 ServerApp/ 下面，方便存取與發佈


## 執行 server 方式

```
$ cd Project/Server App/server
$ slc run .
```

然後開啟 `http://localhost:3000` 即可


## 執行 client build 方式

```
$ cd Project/Client App/
$ npm start
```

以上步驟僅在開發時需要執行，每次檔案有編輯變動時即會自動重建

## 教學文件在 doc.md
