import React from 'react';

/**
 *
 * https://dev.to/vitaliemaldur/resize-event-listener-using-react-hooks-1k0c
 */
const useElementWidth = (element?: HTMLElement | null, property: 'clientWidth' | 'offsetWidth' = 'clientWidth') => {
	// save current element width in the state object
	const [width, setWidth] = React.useState(element?.[property] || 0);

	React.useEffect(() => {
		if (element) {
			// timeoutId for debounce mechanism
			let timeoutId: number;
			setWidth(element[property]);
			const resizeListener = () => {
				// prevent execution of previous setTimeout
				window.clearTimeout(timeoutId);
				// trigger execution after 150 milliseconds
				timeoutId = window.setTimeout(() => {
					// change width only if it differs from current one
					if (element[property] !== width) setWidth(element[property])
				}, 150);
			};
			// set resize listener
			window.addEventListener('resize', resizeListener);

			// clean up function
			return () => {
				// remove resize listener
				window.removeEventListener('resize', resizeListener);
			}
		}
	}, [element]);

	// Tracks elemenet width also when changing in content size
	React.useEffect(() => {
		setWidth(element?.[property] || 0)
	}, [element?.[property]])

	return width;
}

export default useElementWidth;
