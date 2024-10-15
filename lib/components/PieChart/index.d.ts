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
    }[];
}
declare const PieChart: React.FC<PieChartProps>;
export default PieChart;
