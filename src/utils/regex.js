export const regexPattern = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    password: /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
}

export const errorMessage = {
    Email_Required: "Email is required",
    Password_Required: "Password is required",
    Invalid_Email: "Invalid email format",
    Password_Criteria: "Min 8 characters, 1 uppercase, 1 digit, 1 special character",
}

export const getStatusColor = (status) => {
    const baseStyle = {
        fontSize: '12px',
        fontWeight: 500,
        padding: '4px 10px',
        borderRadius: '16px',
        display: 'inline-block',
        textTransform: 'capitalize',
      };
    switch (status?.toUpperCase()) {
      case 'ACTIVE':
        return {...baseStyle, backgroundColor: '#DFF5E1', color: '#2E7D32' };
      case 'INACTIVE':
        return {...baseStyle, backgroundColor: '#FFF3E0', color: '#EF6C00' };
      case 'DELETED':
        return {...baseStyle, backgroundColor: '#FDECEA', color: '#C62828' };
      default:
        return {...baseStyle, backgroundColor: '#E0E0E0', color: '#424242' };
    }
  };

  export const statusOptions = ['ACTIVE', 'INACTIVE', 'DELETED'];