import React, { useState } from 'react';

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css'
import { DateRange } from 'react-date-range';
import { addDays, eachDayOfInterval } from 'date-fns';
import { useMediaQuery } from 'react-responsive';

const ReservationCalendar = ({fechasNoDisponibles = []}) => {
    const [state, setState] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection',
        }
    ]);

    const isMobile = useMediaQuery({ maxWidth: 767 });

    const disabledDates = fechasNoDisponibles.length > 0 ? 
        fechasNoDisponibles.map(rango => {
            const { start, end } = rango;
            const fechaInicio = addDays(Date.parse(start), 1);
            const fechaFin = addDays(Date.parse(end), 1);
            const dias = eachDayOfInterval({
                start: fechaInicio,
                end: fechaFin,
            });
            return dias;
        }).flat()
        : [];

    return (
        
        <DateRange
            onChange={item => setState([item.selection])}
            showSelectionPreview={true}
            moveRangeOnFirstSelection={false}
            months={isMobile ? 1 : 2 }
            disabledDates={disabledDates}
            ranges={state}
            direction='horizontal'
        />
        
    )
};

export default ReservationCalendar;
