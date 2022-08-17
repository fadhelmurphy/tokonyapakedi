export const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  export function ScrollToUp() {

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  
  }

  export const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }