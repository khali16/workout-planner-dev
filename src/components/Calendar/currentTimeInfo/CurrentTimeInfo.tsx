import React, {FunctionComponent} from 'react';
import {getShortenedMonthName} from "../../../utils/dateUtils";

interface OwnProps {
    year: number;
    month: number;
}

type Props = OwnProps;

const CurrentTimeInfo: FunctionComponent<Props> = ({year, month}) => {

  return <>{getShortenedMonthName(month)} {year}</>;
};

export default CurrentTimeInfo;
