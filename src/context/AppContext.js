import React, { createContext, useState } from 'react';

export const AppContext = createContext({ setTheme: () => null });

const AppContextProvider = (props) => {
	const [game, setGame] = useState('');
	const [theme, setTheme] = useState('light');
	return (
		<AppContext.Provider value={{ theme, setTheme, game, setGame }}>
			{props.children}
		</AppContext.Provider>
	);
};

export default AppContextProvider;
