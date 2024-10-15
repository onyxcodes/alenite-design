import ComponentProps from '../Component';
import React from "react";

export interface PieChartProps extends ComponentProps {
	name?: string;
	size?: number;
	data: {
		name?: string;
		percentage: number;
		color?: string;
		label?: string;
	}[]
}
const PieChart: React.FC<PieChartProps> = (props)  => {
	const { size = 220, data,
		className,
		accent, accentDark, accentLight } = props;

	let style: { [key: string]: any } = {
		width: size, height: size
	};

	let alertClass = 'alenite-alert';
	if (className) `${alertClass} ${className}`

	const addLabelText = (bgPath: SVGGraphicsElement, text: string): HTMLElement => {
		// const bgPath = document.getElementById(id) as SVGAElement | null;
		let bbox = bgPath.getBBox();
		let x = bbox.x + bbox.width / 2;
   		let y = bbox.y + bbox.height / 2;

		// Create a <text> element
		let textElem = document.createElementNS("http://www.w3.org/1999/xhtml", "text");
		textElem.setAttribute("x", x.toString());
		textElem.setAttribute("y", y.toString());
		// Centre text horizontally at x,y
		textElem.setAttribute("text-anchor", "middle");
		// Give it a class that will determine the text size, colour, etc
		textElem.classList.add("label-text");
		// Set the text
		textElem.textContent = text;
		// Add this text element directly after the label background path
		return textElem;
	}

	const getSlice = (key: string,
		cx: number, cy: number, radius: number,
		fromangle: number, toangle: number,
		color: string
	): SVGPathElement => {
		var d = " M " + cx + " " + cy;
		for (var i = fromangle; i <= toangle; i++) {
			var radians = i * (Math.PI / 180);  //convert degree to radian
			var x = cx + Math.cos(radians) * radius;
			var y = cy + Math.sin(radians) * radius;

			d += " L " + x + " " + y;
		}
		d += " L " + cx + " " + cy;

		let svgpath = document.createElementNS("http://www.w3.org/1999/svg", "path") as SVGPathElement;
		svgpath.setAttribute("name", key)
		svgpath.setAttribute("d", d);
        svgpath.setAttribute("fill", color);
        svgpath.setAttribute("stroke", color);
		return svgpath
	}

	const slices = React.useMemo(() => {
		const result: React.ReactElement[] = [];
		let fromAngle = 0;
		for (var i = 0; i < data.length; i++) {
			const { name = `slice-${i}`, percentage, color = (accent || "#eee"), label } = data[i];
			// check for configuration errors
			// percentage must be like 15, 20.5 etc..
			if (percentage >= 0 && percentage <= 100) {
				throw new Error("Configuration error. Check slice percentages")
			}
			const toAngle = 360 * (percentage / 100);

			const slice = getSlice(name, size, size, 100, fromAngle, toAngle, color)
			fromAngle = toAngle;
			if (label) {
				const labelText = addLabelText(slice, label);
				result.push(<>
					{slice}
					{labelText}
				</>);
			} else {
				result.push(<>{slice}</>);
			}
		}
		return result;
	}, [data, size]);

	return <svg xmlns="http://www.w3.org/2000/svg" style={style} className={className}>
		{slices}
	</svg>
}

export default PieChart;