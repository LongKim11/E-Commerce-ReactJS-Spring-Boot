import React, { useState } from "react";
import { useSelector } from "react-redux";
import { setLoading } from "../../store/features/loadingSlice";
import { addNewAddress } from "../../api/addressAPI";
import { useDispatch } from "react-redux";
import {
  updateAddressList,
  deleteAddressList,
} from "../../store/features/userSlice";
import { deleteAddress } from "../../api/addressAPI";

export const Profile = () => {
  const userInfo = useSelector((state) => state.user.userInfo);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    street: "",
    city: "",
    state: "",
    zipCode: "",
  });
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const handleAddressChange = (e) => {
    setNewAddress({ ...newAddress, [e.target.name]: e.target.value });
  };

  const handleSaveAddress = () => {
    dispatch(setLoading(true));
    addNewAddress(newAddress)
      .then((res) => {
        setNewAddress({ street: "", city: "", state: "", zipCode: "" });
        setError("");
        console.log("New Address", res);
        dispatch(updateAddressList(res));
      })
      .catch((err) => console.log(err))
      .finally(() => dispatch(setLoading(false)));
  };

  const handleDeleteAddress = (id) => {
    dispatch(setLoading(true));
    deleteAddress(id)
      .then(() => {
        dispatch(deleteAddressList(id));
        setError("");
      })
      .catch((err) => {
        console.log(err);
        setError("This address is in an active order and cannot be deleted");
      })
      .finally(() => dispatch(setLoading(false)));
  };

  return (
    <>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">My Info</h1>

      {error.length > 0 && (
        <div className="mb-4 text-red-600 border border-red-400 bg-red-100 p-3 rounded-md">
          {error}
        </div>
      )}

      {/* Contact Details */}
      <div className="mb-8">
        <div className="flex justify-between items-center border-b pb-2">
          <h2 className="text-2xl font-semibold text-gray-800">
            Contact Details
          </h2>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md font-medium transition hover:bg-blue-700 active:scale-95 cursor-pointer">
            Edit
          </button>
        </div>
        <div className="mt-4 space-y-3">
          <div>
            <p className="text-gray-500 font-semibold">Full Name</p>
            <p className="text-gray-900">
              {userInfo?.firstName} {userInfo?.lastName}
            </p>
          </div>
          <div>
            <p className="text-gray-500 font-semibold">Phone Number</p>
            <p className="text-gray-900">{userInfo?.phoneNumber}</p>
          </div>
          <div>
            <p className="text-gray-500 font-semibold">Email</p>
            <p className="text-gray-900">{userInfo?.email}</p>
          </div>
        </div>
      </div>

      {/* Address Section */}
      <div>
        <div className="flex justify-between items-center border-b pb-2">
          <h3 className="text-2xl font-semibold text-gray-800">Addresses</h3>

          <button
            className="px-4 py-2 bg-green-600 text-white rounded-md font-medium transition hover:bg-green-700 active:scale-95 cursor-pointer"
            onClick={() => setShowAddressForm(!showAddressForm)}
          >
            {showAddressForm ? "Cancel" : "Add New"}
          </button>
        </div>

        {/* Form thêm địa chỉ */}
        {showAddressForm && (
          <div className="mt-4 p-4 border border-gray-200 rounded-lg bg-gray-50 shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Add New Address
            </h3>
            <input
              type="text"
              name="street"
              value={newAddress.street}
              onChange={handleAddressChange}
              placeholder="Street"
              className="w-full p-2 border border-gray-300 rounded-md mb-2"
            />
            <input
              type="text"
              name="city"
              value={newAddress.city}
              onChange={handleAddressChange}
              placeholder="City"
              className="w-full p-2 border border-gray-300 rounded-md mb-2"
            />
            <input
              type="text"
              name="state"
              value={newAddress.state}
              onChange={handleAddressChange}
              placeholder="State"
              className="w-full p-2 border border-gray-300 rounded-md mb-2"
            />
            <input
              type="text"
              name="zipCode"
              value={newAddress.zipCode}
              onChange={handleAddressChange}
              placeholder="Zip Code"
              className="w-full p-2 border border-gray-300 rounded-md mb-2"
            />
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-md font-medium transition hover:bg-blue-700 active:scale-95 mt-2 cursor-pointer"
              onClick={handleSaveAddress}
            >
              Save
            </button>
          </div>
        )}

        {/* Address List */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
          {userInfo?.addressList?.map((address, index) => (
            <div
              key={index}
              className="bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-md mt-3"
            >
              <p className="text-gray-700">
                <span className="font-semibold">Street:</span> {address?.street}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">City:</span> {address?.city}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">State:</span> {address?.state}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Zip Code:</span>{" "}
                {address?.zipCode}
              </p>
              <div className="mt-3 flex gap-4">
                <button className="px-3 py-1.5 bg-blue-600 text-white rounded-md font-medium transition hover:bg-blue-700 active:scale-95 cursor-pointer">
                  Edit
                </button>
                <button
                  className="px-3 py-1.5 bg-red-600 text-white rounded-md font-medium transition hover:bg-red-700 active:scale-95 cursor-pointer"
                  onClick={() => handleDeleteAddress(address.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
