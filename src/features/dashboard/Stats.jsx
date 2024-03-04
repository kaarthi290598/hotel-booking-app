import { formatCurrency } from "../../utils/helpers";
import Stat from "./Stat";
import {
  HiBriefcase,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
  HiOutlineCurrencyDollar,
} from "react-icons/hi2";

function Stats({ bookings, confirmedStays, numDays, cabinCount }) {
  //1.
  const numBookings = bookings.length;

  //2
  const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);

  //3
  const checkins = confirmedStays.length;

  //4
  const occupancyRate =
    (confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) /
      (numDays * cabinCount)) *
    100;

  return (
    <>
      <Stat
        title="Bookings"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numBookings}
      />
      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineCurrencyDollar />}
        value={formatCurrency(sales)}
      />
      <Stat
        title="Check ins"
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        value={checkins}
      />
      <Stat
        title="Occupany Rate"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={`${Math.floor(occupancyRate)}%`}
      />
    </>
  );
}

export default Stats;
