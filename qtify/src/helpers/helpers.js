export const truncate = (str, length) => {
    if (!str) return "";
    return str.length > length ? str.substring(0, length) + "..." : str;
  };