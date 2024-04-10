import { useEffect, useRef, useState } from 'react';
import {
  startOfMonth,
  lastDayOfMonth,
  eachDayOfInterval,
  format,
  subMonths,
  addMonths,
  isSameMonth,
} from 'date-fns';
import { uk } from 'date-fns/locale';
import { useDispatch, useSelector } from 'react-redux';

import { DayComponent } from './Day/Day';
import {
  CalendarHeader,
  CalendarTitle,
  Pagination,
  PaginationButton,
  CalendarWrap,
} from './MonthStatsTable.styled';
import icons from '../../../assets/icons.svg';

import { selectMonthWater } from '../../../redux/water/waterSelectors';
import { selectLang } from '../../../redux/root/rootSelectors';
import { selectTodayWater } from "../../../redux/water/waterSelectors";
import { selectWaterRate } from "../../../redux/water/waterSelectors"; 
import { useTranslation } from 'react-i18next';
import waterApi from "../../../redux/water/waterOperations";


const formatOfYear = 'yyyy';
const formatOfMonth = 'MMMM';
const formatOfDay = 'd';

export const MonthStatsTable = () => {
  const { t } = useTranslation();
  const language = useSelector(selectLang);

  const dispatch = useDispatch();

  const { waterForMonth = [] } = useSelector(selectMonthWater);
  const waterRate = useSelector(selectWaterRate);
  const {allAmountForDay = 0} = useSelector(selectTodayWater);
  const percent = allAmountForDay / waterRate * 100;

  const [currentDate, setCurrentDate] = useState(new Date());
  const [activeButton, setActiveButton] = useState(null);
  const ref = useRef(null);

  const firstDay = startOfMonth(currentDate);
  const lastDay = lastDayOfMonth(currentDate);

  const totalDate = eachDayOfInterval({
    start: firstDay,
    end: lastDay,
  });

  let currentMonth;
  if (language === 'uk') {
    currentMonth = format(currentDate, 'LLLL', { locale: uk });
  } else {
    currentMonth = format(currentDate, formatOfMonth);
  }
  const currentYear = format(currentDate, formatOfYear);
  

  useEffect(() => {
    dispatch(waterApi.getMonthWaterThunk({ date: format(currentDate, 'MM/yyyy') }));
  }, [dispatch, currentDate, percent]);


  const monthData = waterForMonth?.reduce((acc, dayData) => {
      acc[dayData.date] = dayData;
      return acc;
    }, {});


  const handlePrevMonth = () => {
    const newMonth = subMonths(currentDate, 1);
    setCurrentDate(newMonth);
    if (isSameMonth(newMonth, new Date())) {
      setActiveButton(null);
    } else {
      setActiveButton('prev');
    }
  };

  const handleNextMonth = () => {
    const newMonth = addMonths(currentDate, 1);
    setCurrentDate(newMonth);
    if (isSameMonth(newMonth, new Date())) {
      setActiveButton(null);
    } else {
      setActiveButton('next');
    }
  };

  return (
    <div ref={ref}>
      <CalendarHeader>
        <CalendarTitle>{t('month')}</CalendarTitle>
        <Pagination>
          <PaginationButton
            onClick={handlePrevMonth}
            active={activeButton === 'next'}
            type="button"
          >
            <svg>
              <use href={`${icons}#icon-pagination-arrow-prev`}></use>
            </svg>
          </PaginationButton>
          <span>
            {currentMonth}, {currentYear}
          </span>
          <PaginationButton
            onClick={handleNextMonth}
            active={activeButton === 'prev'}
            type="button"
          >
            <svg>
              <use href={`${icons}#icon-pagination-arrow-next`}></use>
            </svg>
          </PaginationButton>
        </Pagination>
      </CalendarHeader>
      <CalendarWrap>
        {totalDate.map((date) => {
          const key = format(date, 'd, MMMM');
          const dayData = monthData[key] || 0;

          const percentage = dayData ? parseInt(dayData.percentageWater) : 0;
          const isHighlighted = dayData
            ? dayData && parseInt(dayData.percentageWater) >= 100
            : false;

          return (
            <DayComponent
              key={key}
              isConsumed={isHighlighted}
              date={format(date, formatOfDay)}
              percentage={percentage}
              day={key}
              calendarRef={ref}
              data={monthData}
            />
          );
        })}
      </CalendarWrap>
    </div>
  );
};
