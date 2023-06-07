    const cloudinary = require("cloudinary").v2;

    cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    // Function to process a single file
    function processFile(file) {
    // Extract the public ID from the file URL
    const publicId = extractPublicId(file.path);

    if (!publicId) {
        console.error(`Invalid file URL: ${file.path}`);
        return;
    }

    cloudinary.api.resource(publicId, (error, result) => {
        if (error) {
        console.error(`Error fetching file ${publicId}:`, error);
        return;
        }

        // Process the file data here
        console.log(`Processing file ${publicId}:`, result);

        // Call the event loop recursively after processing the file
        eventLoop();
    });
    }

    // Extract the public ID from the Cloudinary file URL
    function extractPublicId(fileUrl) {
    const regex = /v\d+\/(.*?)(\.[^.]+)?$/; // Match the pattern "v<version>/<public_id>.<extension>"
    const match = fileUrl.match(regex);
    if (match && match[1]) {
        return match[1];
    }
    return "";
    }

    // List of files to process (defined outside the function)
    let files = [];

    // Event loop function
    function eventLoop() {
    if (files.length === 0) {
        console.log("All files processed.");
        return 
    }

    const file = files.shift(); // Get the next file from the list
    processFile(file);
    }

    module.exports = {
    fileProcessing: (req, res, next) => {
        // Assign the list of files from the request
        console.log(req.files);
        files = req.files.map((file) => ({
        path: file.path, // Cloudinary URL of the file
        }));

        // Start the event loop
        eventLoop(); 

        // Send a response or call the next middleware if needed
        res.json({ message: "File processing started." });
    },
    };

