import { useSelector } from "react-redux";

const Header = () => {
    const {user}=useSelector(state=>state.userReducer)
    console.log(user)
     function getFullname(){
        let fname = user?.firstName.toUpperCase() 
        let lname = user?.lastName.toUpperCase() 
        return fname + ' ' + lname;
    }
    function getInitials(){
        let f = user?.firstName.toUpperCase()[0];
        let l = user?.lastName.toUpperCase()[0];
        return f + l;
    }

  return (
   <div className="app-header">
    <div className="app-logo">
        <i className="fa fa-comments" aria-hidden="true"></i>
        Hey Chat
        </div>
    <div className="app-user-profile">
        <div className="logged-user-name">{getFullname()}</div>
        <div className="logged-user-profile-pic">{getInitials()}</div>
    </div>
</div>

  );
};

export default Header;