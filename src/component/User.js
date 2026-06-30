const User = ({name, Location, Designation}) =>
{
    return(
        <div className="user">
            <h4>Name: {name}</h4>
            <h4>Location: {Location}</h4>
            <h4>Designation: {Designation}</h4>
        </div>
    ) ;
};

export default User;