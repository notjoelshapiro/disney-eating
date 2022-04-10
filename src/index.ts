import axios from "axios";

const urlsToCheck: string[] = [];

const getURLsToCheck = () => {
  return urlsToCheck;
};

const checkURLs = async (urls: string[]) => {
  const errors: any[] = [];
  // urls.forEach(async (url) => {
  //   try {
  //     const response = await fetch(url);
  //     if (!response.ok) {
  //       errors.push({ url, status: response.status });
  //     }
  //   } catch (error) {
  //     errors.push({ url, error });
  //   }
  // }
  console.log("working");
  urls.forEach(async (url: string, index: number) => {
    console.log(`Checking ${url} at index ${index}.`);
    await axios
      .get(url)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        const tempErrorMessage = `Error on index ${index} with message of: ${err.message}`;
        console.log("tempErrorMessage", tempErrorMessage);
        errors.push(tempErrorMessage);
      });
  });

  console.log(`There were ${errors.length} errors`);
  if (errors.length) {
    console.log("errors", errors);
  }
  return true;
};

checkURLs(getURLsToCheck());
