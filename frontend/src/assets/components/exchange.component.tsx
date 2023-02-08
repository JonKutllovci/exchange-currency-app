import { useEffect, useState } from "react";
import { Currency } from "./gallery.component";
import { HiOutlineSwitchVertical } from "react-icons/hi";
/**
 * ExchangeComponent component 
 * @param props React props 
 */
const ExchangeComponent = (props: {
  type: any;
  from: Currency;
  to: Currency;
}) => {
  const { type, from, to } = props;
  const [value, setValue] = useState<Number>();

  /**
   * Function for calculating the Rate 
   * @param from from which currency
   * @param to to which currency
   */
  function calcRate(from: Currency, to: Currency) {
    let amt = 1;
    console.log({ amt, from, to });
    if (!from || !from.purchase || !from.sale) return 0;
    if (!to || !to.sale || !to.purchase) return 0;

    let base = to.sale / from.sale;

    let sell = amt * base;
    setValue(sell);

    return sell;
  }

  useEffect(() => {
    setValue(calcRate(from, to));
  }, [from, to]);

  /**
   * returns the code for render
   */
  const returns = (
    <>
      <div className="exchange-component">
        <div className="grid-item">
          <button className="btn" onClick={type}>
            <HiOutlineSwitchVertical className="icon" />
          </button>
        </div>
        <div className="grid-item">
          <p className="rate">
            <>
              1 {to.name} = {value} {from.name}
            </>
          </p>
        </div>
      </div>
    </>
  );

  return returns;
};

export default ExchangeComponent;
