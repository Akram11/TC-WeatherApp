export const shouldIcnBeInverted = (icon: string) => {
  if (
    icon === "01n" ||
    icon === "13n" ||
    icon === "13d" ||
    icon === "50n" ||
    icon === "50d"
  ) {
    return true;
  }
  return false;
};
