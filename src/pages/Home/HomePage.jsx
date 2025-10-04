import { useQuery } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../hooks/useAuth";
import { useState, useEffect } from "react";
// import {
//   readMe,
//   readItems,
// } from "@directus/sdk";
// import { useDirectus } from "../../context/DirectusContext";

function HomePage() {
  const pageSize = 100;
  // const directusClient = useDirectus();

  const [taskIdsString, setTaskIdsString] = useState("");
  const [assigneeEmail, setAssigneeEmail] = useState("");
  const [taskItemArray, setTaskItemArray] = useState([]);
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

    setTaskItemArray([
      {
        id: 1,
        name: "Beaker",
        school: "SMK Sacred Heart",
        quantity: 10,
        image: "https://placecats.com/300/200",
      },
      {
        id: 2,
        name: "Microbit",
        school: "SMK Sacred Heart",
        quantity: 5,
        image: "https://placecats.com/300/200",
      },
      {
        id: 3,
        name: "Kettle",
        school: "SMK Sacred Heart",
        quantity: 2,
        image: "https://placecats.com/300/200",
      },
      {
        id: 4,
        name: "Fridge",
        school: "SMK Sacred Heart",
        quantity: 2,
        image: "https://placecats.com/300/200",
      },
      {
        id: 5,
        name: "Ball",
        school: "SMK Sacred Heart",
        quantity: 10,
        image: "https://placecats.com/300/200",
      },
      {
        id: 6,
        name: "Chicken",
        school: "SMK Sacred Heart",
        quantity: 5,
        image: "https://placecats.com/300/200",
      },
      {
        id: 7,
        name: "Bees",
        school: "SMK Sacred Heart",
        quantity: 2,
        image: "https://placecats.com/300/200",
      },
      {
        id: 8,
        name: "Lamb Chop",
        school: "SMK Sacred Heart",
        quantity: 2,
        image: "https://placecats.com/300/200",
      },
    ]);
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
    <div className="p-3 text-left min-h-screen lg:container">
      <div className="header flex justify-start items-center mb-2 py-2">
        <h1 className="text-xl font-semibold mr-4">Welcome {me?.first_name}</h1>
        <div className="flex gap-2">
          <Link
            to="/quiz"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition duration-200 ease-in-out"
          >
            🎓 Take Quiz
          </Link>
          <button
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded transition duration-200 ease-in-out"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
      <hr />
      <h2 className="text-xl font-semibold mr-4 py-4">
      </h2>
      {isLoading && <div>Loading...</div>}

      <main className="flex flex-wrap text-sm -mr-2 mb-4">
        {taskItemArray != null ? (
          taskItemArray.map((item) => {
            if (item == null) {
              return null;
            }
            return item.id !== undefined ? (
              <div className="lg:w-1/4 md:w-1/3 sm:w-1/2 w-full p-2">
                <div
                  key={item.id}
                  className="card-item bg-gray-100 hover:bg-orange-100 transition-colors duration-200 p-4 rounded group relative rounded-xl overflow-hidden"
                >
                  <div className={`text-black no-underline block ${item.mattermost_thread_link ? "" : 'pointer-events-none'}`}>
                    <img src={item.image} />
                    <h3 className="font-semibold text-base">{item.name}</h3>
                    <div className="text-base">{item.school}</div>
                    <div className="text-italic text-base">Left: {item.quantity}</div>
                  </div>
                  <div className="cta-holder absolute z-10 top-0 left-0 right-0 bottom-0 bg-black bg-opacity-40 flex items-center justify-center invisible group-hover:visible">
                    <Link
                        target="_blank"
                        to={`/item/${item.id || ""}`}
                        className="bg-white rounded p-2 font-bold"
                    >
                        BOOK NOW
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <></>
            );
          })
        ) : (
          <div>No tasks found</div>
        )}
      </main>
    </div>
  );
}

export default HomePage;
