const getInitials = (firstName: string, lastName: string) => {
  const firstNameInitial = firstName.charAt(0);
  const lastNameInitial = lastName.charAt(0);

  return `${firstNameInitial}${lastNameInitial}`;
};

export default getInitials;
