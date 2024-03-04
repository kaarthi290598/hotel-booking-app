import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";

function CabinTable() {
  const { isLoading, cabins } = useCabins();

  const [searchParams] = useSearchParams();

  // console.log(searchParams.get("discount"));

  if (isLoading) return <Spinner />;
  //filter
  const filterParams = searchParams.get("discount") || "all";

  let cabinFilter = [];

  if (filterParams === "all") {
    cabinFilter = cabins;
  } else if (filterParams === "no-discount") {
    cabinFilter = cabins.filter((cabin) => cabin.discount <= 0);
  } else if (filterParams === "with-discount") {
    cabinFilter = cabins.filter((cabin) => cabin.discount > 0);
  }

  //sort
  const sortBy = searchParams.get("sort-by") || "name-asc";

  const [field, direction] = sortBy.split("-");

  const modifier = direction === "asc" ? 1 : -1;

  const sortedCabins = cabinFilter.sort(
    (a, b) => (a[field] - b[field]) * modifier
  );

  return (
    <Menus>
      <Table $columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>cabin</div>
          <div>Capacity</div>
          <div>price</div>
          <div>Discount</div>
        </Table.Header>
        <Table.Body
          data={cabinFilter}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
