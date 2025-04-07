import "./FlashDealCard.css";

export const FlashDealCard = ({ className, ...props }) => {
  return (
    <div className={"flash-deal-card " + className}>
      <div className="group-302">
        <img className="pngegg-1" src="/img/lol.png" />
        <button className="div">리그오브레전드 사양 추천 </button>
      </div>
    </div>
  );
};
export default FlashDealCard