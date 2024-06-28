export default function FilterStatus({
  unMember,
  setUnMember,
  independent,
  setIndependent,
  handleToogle,
}) {
  return (
    <div className="space-y-3">
      <p>Status</p>
      <div className="flex items-center gap-3 text-white">
        <input
          className=" size-6 bg-black border-2 border-gray rounded-md checked:bg-blue checked:border-none focus:ring-0"
          type="checkbox"
          checked={unMember}
          onChange={() =>
            handleToogle(setUnMember, independent, (c) => c.unMember)
          }
          name=""
          id=""
        />
        <label htmlFor="">Member of the united Nations</label>
      </div>
      <div className="flex items-center gap-3 text-white">
        <input
          className="size-6 bg-black border-2 border-gray rounded-md checked:bg-blue checked:border-none focus:ring-0"
          type="checkbox"
          checked={independent}
          onChange={() =>
            handleToogle(setIndependent, unMember, (c) => c.independent)
          }
          name=""
          id=""
        />
        <label htmlFor="">Independent</label>
      </div>
    </div>
  );
}
