interface UserProfileProps {}

const UserProfile: React.FC<UserProfileProps> = () => {
  // {allUserData?.map((user) => {
  //   const userDetails = [
  //     { label: "Email", value: user.email ?? "N/A" },
  //     { label: "Department", value: user.departmentName ?? "N/A" },
  //     { label: "Phone", value: user.userId.toString() ?? "N/A" },
  //   ];

  //   return (
  //     <CompanyDetails
  //       companyDataError={allUserDataError}
  //       companyDataLoading={allUserDataLoading}
  //       companyDetails={userDetails}
  //       title={`${user?.firstName} ${user.lastName ?? "No User"}`}
  //       navigateTo={`${
  //         location.pathname === "/settings"
  //           ? "company-profile/edit-info"
  //           : "edit-info"
  //       }`}
  //       setPopupOpen={setPopupOpen}
  //     />
  //   );
  // })}
  return <div>userProfile</div>;
};

export default UserProfile;
