import { useQuery } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../hooks/useAuth";
import { Package, DollarSign, Ban, User, Phone, StickyNote, PlusSquare, Info } from 'lucide-react';
import { useState, useEffect } from "react";
// import {
//   readMe,
//   readItems,
// } from "@directus/sdk";
// import { useDirectus } from "../../context/DirectusContext";

function ItemDetailsPage() {
  const pageSize = 100;
  // const directusClient = useDirectus();

  const [taskIdsString, setTaskIdsString] = useState("");
  const [assigneeEmail, setAssigneeEmail] = useState("");
  const [item, setItem] = useState({});
  const [borrowQuantity, setBorrowQuantity] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [ledgerAccountTransfers, setLedgerAccountTransfers] = useState("");
  const [ledgerAccounts, setLedgerAccounts] = useState("");
  const [balanceAccounts, setBalanceAccounts] = useState("");
  const [balanceAccountData, setBalanceAccountData] = useState("");

  const { data: me } = useQuery("userData", async () => {
    // const me = await directusClient.request(
    //   readMe({
    //     fields: ["*"],
    //   }),
    // );
    // return me;
    return {};
  });

  const auth = useAuth();

  const loadData = async () => {
    setIsLoading(true);

    setItem(
      {
        id: 1,
        name: "Beaker",
        school: "SMK Sacred Heart",
        quantity: 10,
        image: "https://placecats.com/300/200",
        remarks: "Please make sure don't break.",
        coordination: { x: 123, y: 108 },
        creditValue: 10,
        penaltyValue: 100,
        contactName: "Mr Winston",
        contactWhatsapp: "+60168556201",
      },
    );
    const filterAnd = [];

    // const balanceAccounts = await directusClient
    //   .request(
    //     readItems("BalanceAccount", {
    //       sort: ["-date_created"],
    //       filter: {
    //         _and: filterAnd
    //       }
    //     }),
    //   )
    //   .catch(
    //     async (err) => {
    //       setIsLoading(false);
    //       if (Array.isArray(err?.errors) && err?.errors.length > 0) {
    //         const causeOfError = err?.errors[0]?.extensions?.code;
    //         if (causeOfError === "INVALID_CREDENTIALS") {
    //           await directusClient.logout();
    //         }
    //       }
    //     },
    //   );

    // if (ledgerAccountTransfers && ledgerAccounts && balanceAccounts && balanceAccountData) {
    //   setLedgerAccountTransfers(ledgerAccountTransfers);
    //   setLedgerAccounts(ledgerAccounts);
    //   setBalanceAccounts(balanceAccounts);
    //   setBalanceAccountData(balanceAccountData);
    // } else {
    //   toast.error("Something wrong with the filter value.");
    // }

    setIsLoading(false);
  }
  
  useEffect(() => {
    loadData();
  }, []);

  const navigate = useNavigate();

  const handleLogout = () => {
    // void directusClient.logout();
  };

  useEffect(() => {
    if (!auth.isLoggedIn) {
      // navigate("/login");
    }
  }, [auth.isLoggedIn, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4 sm:p-6 lg:p-8 font-sans">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden w-full max-w-4xl flex flex-col md:flex-row transform transition-all duration-300 hover:scale-[1.01]">
        {/* Item Image Section */}
        <div className="md:w-1/2 p-6 flex flex-col items-center justify-center bg-indigo-50 rounded-l-3xl">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-64 object-cover rounded-xl shadow-lg mb-4 border-4 border-indigo-200"
            onError={(e) => {
              e.target.onerror = null; // Prevent infinite loop
              e.target.src = `https://placehold.co/300x200/667eea/ffffff?text=${item.name.substring(0, 10)}`; // Fallback image
            }}
          />
          <h2 className="text-4xl font-extrabold text-indigo-800 mb-2 text-center">{item.name}</h2>
          <p className="text-xl text-indigo-600 font-medium mb-4 text-center">{item.school}</p>
        </div>

        {/* Item Details and Booking Section */}
        <div className="md:w-1/2 p-8 flex flex-col justify-between">
          {/* Section 1: Core Item Details */}
          <div className="mb-8 p-4 bg-gray-50 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-indigo-300 pb-2 flex items-center">
              <Info className="w-6 h-6 mr-2 text-indigo-600" />
              Item Information
            </h3>
            {/* Changed to a single column grid for three lines */}
            <div className="grid grid-cols-1 gap-y-4 text-gray-700">
              <p className="flex items-center text-lg">
                <Package className="w-5 h-5 mr-2 text-indigo-500" />
                <strong className="font-semibold text-indigo-700">Available Quantity:</strong>
                <span className="text-green-600 font-bold text-xl ml-2">{item.quantity}</span>
              </p>
              <p className="flex items-center text-lg">
                <DollarSign className="w-5 h-5 mr-2 text-purple-500" />
                <strong className="font-semibold text-indigo-700">Credit Value:</strong>
                <span className="ml-2 text-purple-600">{item.creditValue}</span>
              </p>
              <p className="flex items-center text-lg">
                <Ban className="w-5 h-5 mr-2 text-red-500" />
                <strong className="font-semibold text-indigo-700">Penalty Value:</strong>
                <span className="ml-2 text-red-600">{item.penaltyValue}</span>
              </p>
            </div>
          </div>

          {/* Section 2: Contact Details */}
          <div className="mb-8 p-4 bg-gray-50 rounded-lg shadow-sm border border-gray-200">
            <h4 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-indigo-300 pb-2 flex items-center">
              <User className="w-6 h-6 mr-2 text-indigo-600" />
              Contact Information
            </h4>
            <div className="grid grid-cols-1 gap-y-4 text-gray-700"> {/* Changed to 1 column as only contact name remains */}
              <p className="flex items-center text-lg"><User className="w-5 h-5 mr-2 text-gray-600" /> <strong className="font-semibold text-indigo-700">Contact Person:</strong> <span className="ml-2 text-gray-800">{item.contactName}</span></p>
              {/* Removed the Contact WhatsApp line */}
            </div>
          </div>

          {/* Section 3: Remarks */}
          <div className="mb-8 p-4 bg-blue-50 rounded-xl border border-blue-200 shadow-inner">
            <h4 className="text-xl font-bold text-gray-800 mb-3 flex items-center">
              <StickyNote className="w-6 h-6 mr-2 text-blue-600" />
              Remarks:
            </h4>
            <p className="text-gray-700 italic">{item.remarks}</p>
          </div>

          {/* Section 4: Quantity Selector */}
          <div className="mb-8 p-4 bg-gray-50 rounded-lg shadow-sm border border-gray-200">
            <label htmlFor="borrowQuantity" className="block text-xl font-bold text-gray-800 mb-3 flex items-center">
              <PlusSquare className="w-6 h-6 mr-2 text-indigo-600" />
              Quantity to Borrow:
            </label>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setBorrowQuantity(borrowQuantity - 1)}
                disabled={borrowQuantity <= 1}
                className="bg-red-500 text-white text-2xl px-5 py-2 rounded-full shadow-md hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition duration-300 transform hover:scale-110"
              >
                -
              </button>
              <input
                type="number"
                id="borrowQuantity"
                value={borrowQuantity}
                onChange={(event) => setBorrowQuantity(event.target.value)}
                required
                disabled={item.quantity <= 0}
                placeholder="Quantity"
                min="1"
                max={item.quantity}
                className="w-28 text-center bg-white border-2 border-indigo-400 rounded-lg py-2 text-2xl font-semibold text-gray-800 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition duration-200"
              />
              <button
                onClick={() => setBorrowQuantity(borrowQuantity + 1)}
                disabled={borrowQuantity >= item.quantity}
                className="bg-green-500 text-white text-2xl px-5 py-2 rounded-full shadow-md hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition duration-300 transform hover:scale-110"
              >
                +
              </button>
            </div>
            {borrowQuantity > item.quantity && (
              <p className="text-red-600 text-sm mt-3 font-medium">Cannot borrow more than available quantity ({item.quantity}).</p>
            )}
          </div>

          {/* WhatsApp Booking Button */}
          <div className="mt-auto pt-6 border-t-2 border-green-300">
            <a
              href={`https://wa.me/${item.contactWhatsapp || ""}?text=Hello%2C%0AMay%20I%20borrow%20${item.quantity}%20of%20the%20${item.name}%20from%20your%20school.%2CThrough:%20STEM%20HOUSE`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center bg-gradient-to-r from-green-500 to-teal-500 text-white font-extrabold text-xl py-4 px-8 rounded-full shadow-lg hover:from-green-600 hover:to-teal-600 focus:outline-none focus:ring-4 focus:ring-green-300 focus:ring-opacity-75 transition duration-300 transform hover:scale-105 active:scale-95"
            >
              <svg className="w-8 h-8 mr-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.557-3.84-1.557-5.892 0-6.502 5.292-11.792 11.792-11.792 3.227 0 6.235 1.267 8.529 3.561s3.561 5.292 3.561 8.529c0 6.502-5.292 11.792-11.792 11.792-1.993 0-3.993-.49-5.746-1.446l-6.223 1.654zm6.557-6.929l-.493-.309c-.483-.29-.95-.436-1.428-.436-1.042 0-2.083.486-2.917 1.442-.834.956-1.25 2.222-1.25 3.488 0 1.266.416 2.532 1.25 3.488.834.956 1.875 1.442 2.917 1.442 1.042 0 2.083-.486 2.917-1.442.834-.956 1.25-2.222 1.25-3.488 0-1.266-.416-2.532-1.25-3.488-.834-.956-1.875-1.442-2.917-1.442zm11.792-2.222c0 1.266-.416 2.532-1.25 3.488-.834.956-1.875 1.442-2.917 1.442-1.042 0-2.083-.486-2.917-1.442-.834-.956-1.25-2.222-1.25-3.488 0-1.266-.416-2.532 1.25-3.488.834-.956 1.875-1.442 2.917-1.442 1.042 0 2.083.486 2.917 1.442.834.956 1.25 2.222 1.25 3.488z"/>
              </svg>
              Book Now via WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );

  // return (
  //   <div className="p-3 text-left min-h-screen lg:container">
  //     <div className="header flex justify-start items-center mb-2 py-2">
  //       <h1 className="text-xl font-semibold mr-4">Welcome {me?.first_name}</h1>
  //       <button
  //         className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded transition duration-200 ease-in-out"
  //         onClick={handleLogout}
  //       >
  //         Logout
  //       </button>
  //     </div>
  //     {isLoading && <div>Loading...</div>}

  //     <main className="gap-3 text-sm mb-4">
  //       {item != null ? (
  //         item.map((item) => {
  //           if (item == null) {
  //             return null;
  //           }
  //           return item.id !== undefined ? (
  //             <div
  //               key={item.id}
  //               className="card-item bg-gray-100 transition-colors duration-200 p-4 rounded rounded-xl overflow-hidden"
  //             >
  //                 <div className="text-xs">#{item.id}</div>
  //                 <img src={item.image} />
  //                 <h3 className="font-semibold text-base">{item.name}</h3>
  //                 <div className="text-base">{item.school}</div>
  //                 <div className="text-base">
  //                   <span className="pr-1">{item.contactName}</span>
  //                   (<Link
  //                     target="_blank"
  //                     className="text-base" 
  //                     to={`https://wa.me/item/${item.contactWhatsapp || ""}?text=Hello%2C%0AMay%20I%20borrow%20${item.quantity}%20of%20the%20${item.name}%20from%20your%20school`}
  //                   >{item.contactWhatsapp}</Link>)
  //                 </div>
  //                 <div className="text-base">Credit Value: {item.creditValue}</div>
  //                 <div className="text-base">Penalty Value: {item.penaltyValue}</div>
  //                 <div className="text-italic text-base">Left: {item.quantity}</div>
                  
  //                 <div className="text-base text-underline text-bold pt-2">Remarks:</div>
  //                 <hr className=""/>
  //                 <div>{item.remarks}</div>
  //             </div>
  //           ) : (
  //             <></>
  //           );
  //         })
  //       ) : (
  //         <div>No tasks found</div>
  //       )}
  //     </main>
  //   </div>
  // );
}

export default ItemDetailsPage;
