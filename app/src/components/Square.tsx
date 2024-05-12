interface Iprops {
  chooseSquare: (value: unknown) => void;
  val:string;
}

const Square = ({ chooseSquare,val }: Iprops) => {
  return <div
  className=" square rounded-lg "
  onClick={chooseSquare}>{val}</div>;
};

export default Square;
