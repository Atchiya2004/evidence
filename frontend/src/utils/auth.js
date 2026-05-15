export const getRole = () => localStorage.getItem("role");

export const isAdmin = () => getRole() === "admin";
export const isCID = () => getRole() === "cid";
export const isLawyer = () => getRole() === "lawyer";