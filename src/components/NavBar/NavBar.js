import SideBar from '../sideBar/sideBar';
import "./NavBar.css";
const NavBar = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0px 30px",
        position:'fixed',
        width: '100%',
        backgroundColor: 'white',
        zIndex: 100_000,
        boxShadow: '1px -4px 6px',
      }}
    >
      <SideBar />
      <h4 style={{padding:0,margin:0}}>Covid-19 Tracker</h4>
    </div>
  );
};
export default NavBar;