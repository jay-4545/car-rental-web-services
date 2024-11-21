const fs = require("fs/promises");
const path = require("path");
const MyError = require("./errorUtils");

const checkAndCreateDir = async (path) => {
  try {
    await fs.access(path);
  } catch (error) {
    await fs.mkdir(path);
  }
};

const addSingleFile = async (image, folderName) => {
  const pathToFolder = path.join(__dirname, `../uploads/${folderName}`);
  const baseURL = `${process.env.BASE_URL}/uploads/${folderName}`;

  const uniqueName = Date.now() + "-" + image.name;
  await image.mv(path.join(pathToFolder, uniqueName));

  return `${baseURL}/${uniqueName}`;
};

const deleteSingleFile = async (image, folderName) => {
  const pathToFolder = path.join(__dirname, `../uploads/${folderName}`);
  const name = path.parse(image).base;
  const filesInFolder = await fs.readdir(pathToFolder);

  if (filesInFolder.includes(name)) {
    await fs.unlink(path.join(pathToFolder, name));
  }
};

const addFiles = async (image, folderName) => {
  // Check if at least 2 image are there.
  if (!image || !Array.isArray(image)) {
    throw new MyError("image are required!", 400);
  }

  const pathToFolder = path.join(__dirname, `../uploads/${folderName}`);
  const baseURL = `${process.env.BASE_URL}/uploads/${folderName}`;

  // Check if folder exists in uploads if not create it.
  await checkAndCreateDir(pathToFolder);

  const imageURLs = [];

  for (const images of image) {
    const uniqueName = Date.now() + "-" + images.name;
    const uploadPath = path.join(pathToFolder, uniqueName);
    await images.mv(uploadPath);
    imageURLs.push(`${baseURL}/${uniqueName}`);
  }

  return imageURLs;
};

const deleteFiles = async (image, folderName, bodyimage = null) => {
  const pathToFolder = path.join(__dirname, `../uploads/${folderName}`);
  const filesInFolder = await fs.readdir(pathToFolder);

  if (bodyimage) {
    for (const images of image) {
      const name = path.parse(images).base;
      if (!bodyimage.includes(images)) {
        if (filesInFolder.includes(name)) {
          await fs.unlink(path.join(pathToFolder, name));
        }
      }
    }
  } else {
    for (const images of image) {
      const name = path.parse(images).base;
      if (filesInFolder.includes(name)) {
        await fs.unlink(path.join(pathToFolder, name));
      }
    }
  }
};

module.exports = {
  checkAndCreateDir,
  addSingleFile,
  deleteSingleFile,
  addFiles,
  deleteFiles,
};
