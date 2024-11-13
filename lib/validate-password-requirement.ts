import { PasswordRequirement } from '@/types';

const validatePasswordRequirement = (
  password: string,
  requirement: PasswordRequirement
) => {
  if (requirement === 'Min. 8 characters') {
    if (password?.length > 7) {
      return true;
    } else {
      return false;
    }
  }

  if (requirement === 'Number') {
    if (/[0-9]/.test(password)) {
      return true;
    } else {
      return false;
    }
  }

  if (requirement === 'Symbol') {
    if (/[$-/:-?{-~!"^_`\[\]]/.test(password)) {
      return true;
    } else {
      return false;
    }
  }
};

export default validatePasswordRequirement;
