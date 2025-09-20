import React from "react";


const Button = ({ children, iconName, iconPosition, fullWidth, ...props }) => {
	// Remove iconName, iconPosition, and fullWidth from being passed to the DOM
	return <button {...props}>{children}</button>;
};

export default Button;
