import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";
import TableOperations from "../../ui/TableOperations";

function CabinTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="discount"
        options={[
          { value: "all", label: "All" },
          { value: "no-discount", label: "No Discount" },
          { value: "with-discount", label: "With Discount" },
        ]}
      />

      <SortBy
        options={[
          { value: "name-asc", label: "Sort by name (a-z)" },
          { value: "name-des", label: "Sort by name (z-a)" },
          { value: "regularPrice-asc", label: "Sort by Price (Low First)" },
          { value: "regularPrice-des", label: "Sort by Price (High First)" },
          { value: "maxCapacity-asc", label: "Sort by Capacity (Low First)" },
          { value: "maxCapacity-des", label: "Sort by Capacity (High First)" },
        ]}
      />
    </TableOperations>
  );
}

export default CabinTableOperations;
