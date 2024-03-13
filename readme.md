PDF Organizer

Stack: nodejs, express, multer, front idk yet (vanilla js, maybe htmx or react)
Dev deps: nodemon
Runtime deps: imagemagick (might switch to pdf.js)

TODO:

1. ability to add pdf files to the server.
2. ability to read basic metadata of pdf files
3. ability to take a snapshot of pdf cover page
4. ability to add some additional useful data, like word count, language, maybe AI summarization

Schema:
User {
id: Number,
name: String,
api_key: URL (openai api key)
}

Files {
id: number
userid: Number, // userID
amount: Number,
}

File {
id: number,
userFiles: number, // Files ID
filename: String,
filenameWithoutExt: String,
firstPageDescription: String
}
