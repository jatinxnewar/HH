import React from "react";

const Header = ({ children, notificationCount, ...props }) => {
	// Remove notificationCount from being passed to the DOM
	return <header {...props}>{children}</header>;
};

export default Header;
