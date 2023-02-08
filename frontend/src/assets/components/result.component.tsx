import { Currency } from "./gallery.component";
/**
 * 
 * @param props React props
 */
const ResultComponent = (props: {
  result: any[];
  value: any;
  onChange: any;
  currency: Currency;
  setState: any;
}) => {
  const { result, value, onChange, currency, setState } = props;

  /**
   * returning code for render
   */
  return (
    <>
      <div className="group">
        <select value={currency.name} onChange={onChange}>
          {result.map((currency, i) => (
            <option key={i}>{currency.currency_name}</option>
          ))}
        </select>
        <input type="text" value={value} onChange={setState} />
      </div>
    </>
  );
};

export default ResultComponent;
