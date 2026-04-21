const Header = () => {
  return (
   <div className="app-header">
    <div className="app-logo">
        <i className="fa fa-comments" aria-hidden="true"></i>
        Hey Chat
        </div>
    <div className="app-user-profile">
        <div className="logged-user-name">John Smith</div>
        <div className="logged-user-profile-pic">JS</div>
    </div>
</div>

  );
};

export default Header;