import { Form, Formik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import excelIcon from "../../assets/images/csvIcon.png";
import * as XLSX from "xlsx";
import Papa from "papaparse";
import { toast } from "react-toastify";
import {
  getIcpScore,
  getProductSubCategory,
  getProductsCategory,
  getStandardUserDetails,
  getUserSubscriptionPlanDetails,
  getAllTopics,
  getAllTopicsWithUrl,
  getGeoLocation,
  getBomboraIntentRange,
} from "../../context/actions/User";
import { BuildYourIcpValidation } from "../../utils/Validations/Validations";
import "./BuildYourICP.scss";
import excelTemplate from "../../assets/alltemplates/abmtemplate.csv";
import { saveAs } from "file-saver";
import Information from "./ICPResult/Information";
import InformationStaff from "../BuildICP/ICPResult/InformationStaff";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { ListBox } from "primereact/listbox";
import SearchModel from "./Modals/ExportFile/SearchModel";
import { Dropdown } from "primereact/dropdown";
import { VirtualScroller } from "primereact/virtualscroller";
import { Skeleton } from "primereact/skeleton";
import bomboralogo from "../../assets/images/Powered by Bombora.png";
// import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { Tooltip } from 'react-tooltip'

import ToastModal from "../../components/Modal/TosterModel";
import SaveSearch from "./Modals/SaveSearch";
import SaveSearchFileName from "./Modals/SaveSearchFileName";
import loaderMessages from "../../json/loaderMessages.json"
import { FirstLetterCapital } from "../../utils/constants";
import errorIcon from "../../assets/images/exlamation.png";
import { number } from "yup";

const BuildYourICP = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formikRef = useRef();
  const scrollerRef = useRef(null);

  const userData = useSelector((state) => state?.user);
  const isSubscribed = useSelector(
    (state) => state?.userSubscriptionData?.userSubscrptionData
  );

  // const udesubscriptiondata = useSelector(
  //   (state) => state?.userSubscriptionData?.userSubscrptionData?.data
  // );
  const [selectedMenus, setSelectedMenus] = useState([]);
  const selectedCount = selectedMenus.length;
  const maxSelections = 12;
  const token = useSelector((state) => state?.user?.userInfo?.token);

  const userId = userData?.userInfo?.user_id || userData?.userInfo?.user;
  const [getUserSubscriptionData, setGetUserSubscriptionData] = useState([]);
  const isStaff = userData.userInfo.is_staff;
  const [staffDetails, setStaffDetails] = useState();
  const [getAllProductsCategory, setAllProductsCategory] = useState([]);
  const [getAllSubProductCategories, setGetAllSubProductCategories] = useState(
    []
  );
  const [topicUrlList, setTopicListUrlData] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [allMenus, setAllMenu] = useState([]);
  const [menuOptions, setMenuOptions] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTopicKey, setSearchTopicKey] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [filteredOptions, setFilteredOptions] = useState(menuOptions);
  const [categoryOptions, setCategoryOptions] = useState();
  const [themeOptions, setThemeOptions] = useState();
  const [getAllGeolocation, setGeoLocation] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [toastData, setToastData] = useState({});
  //below use state is for opening the AddProfilePicture Model
  const [showAddProfileModal, setShowAddProfileModal] = useState(false);
  const [loadingTopic, setLoadingTopic] = useState(true)
  // const [productList, setProductList] = useState([])  // ----comment product field in build your vais-----
  const [isSaving, setIsSaving] = useState(false);
  const [randomMessage, setRandomMessage] = useState("");
  const [loading, setLoading] = useState(false);


  const tooltip = (
    <Tooltip anchorSelect='#ibutton-tooltip' place="top" style={{ zIndex: 999, fontSize: '1rem', padding: '10px', width: '75%' }}>
      <span>
        <p>Choose topics relevant to the selected Product Subcategory.</p>
        <p>
          Please select at least one topic and up to a maximum of 12 topics.
        </p>
        <p>
          Refer to the FAQs section for Best Practices for Topic Selection
          including VAIS+Intent Interpretation.
        </p>
      </span>
    </Tooltip>
  );

  const [initialValues, setInitialValues] = useState({
    product_category_name: "",
    product_sub_category_name: "",
    uploadSuppressionFile: null,
    location: [],
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [confirmationMessage, setConfirmationMessage] = useState("");

  useEffect(() => {

    if (isSubscribed?.status === 404) {
      navigate("/subscription-plans");
      toast(isSubscribed.message, { autoClose: 1200 });
    }
  }, [isSubscribed]);

  useEffect(() => {
    localStorage.removeItem('isDownloadedRow')
    if (userId) {
      const payload = {
        user_id: userId,
      };
      dispatch(
        getUserSubscriptionPlanDetails(payload, token, (result) => {
          if (result?.status === 200) {
            setGetUserSubscriptionData(result?.data);
          }
        })
      );
    }
  }, []);
  useEffect(() => {

    dispatch(
      getBomboraIntentRange(token, (result) => {
        if (result?.status === 200) {

        }
      })
    )

  }, []);

  useEffect(() => {
    if (scrollerRef.current) {
      scrollerRef.current.scrollToIndex(0);
    }
  }, [searchTopicKey, selectedCategory, selectedTheme]);
  // [filteredOptions]);
  useEffect(() => {
    const selectedCount = selectedMenus.length;
    if (selectedCount > maxSelections) {
      setErrorMessage(
        `${selectedCount}/${maxSelections} Intent topics limit is exceeded.`
      );
      setConfirmationMessage("");
    } else {
      setErrorMessage("");
      const remaining = maxSelections - selectedCount;
      setConfirmationMessage(
        `${selectedCount}/${maxSelections} Intent topics are selected`
      );
    }
  }, [selectedMenus]);

  // useEffect(() => {
  //   if (userData.userInfo.is_staff) {
  //     let id = userData.userInfo?.user_staff?.user;
  //     dispatch(
  //       getStandardUserDetails({ user_id: id }, token, (result) => {
  //         setStaffDetails(result);
  //       })
  //     );
  //   }
  // }, []);

  useEffect(() => {
    dispatch(
      getGeoLocation(token, (result) => {
        const convertedData = [
          { value: "selectAll", label: "Select All" },
          ...result.map((item) => ({
            value: item.country,
            label: FirstLetterCapital(item.country),
          })),
        ];
        setGeoLocation(convertedData);
      })
    );
  }, []);

  useEffect(() => {
    const filterOptions = () => {
      let filtered = menuOptions;

      if (searchTopicKey) {
        filtered = filtered.filter((menu) =>
          menu.name.toLowerCase().includes(searchTopicKey.toLowerCase())
        );
      }

      if (selectedCategory) {
        filtered = filtered.filter(
          (menu) => menu.category === selectedCategory
        );
      }

      if (selectedTheme) {
        filtered = filtered.filter((menu) => menu.theme === selectedTheme);
      }

      setFilteredOptions(filtered);
    };

    filterOptions();
  }, [searchTopicKey, selectedCategory, selectedTheme, menuOptions]);

  //this use effect for get all product categories
  const loadingTemplate = (options) => {
    return (
      <div style={{ height: "50px" }}>
        <Skeleton width={options.even ? "60%" : "50%"} height="1.3rem" />
      </div>
    );
  };

  const LoadingComponent = () => {
    const skeletonCount = 7; // Number of skeletons to display

    return (
      <div style={{ height: "300px", border: "1px solid #ced4da", marginTop: "15px" }}>
        {Array.from({ length: skeletonCount }).map((_, index) => {
          const width = index % 2 === 0 ? '50%' : '60%';
          return (

            <div key={index} style={{ margin: "28px 0", paddingLeft: "10px" }}> {/* Apply margin to each skeleton wrapper */}
              <Skeleton width={width} height="1.2rem" />

            </div>);
        })}
      </div>
    );
  };

  useEffect(() => {
    dispatch(
      getProductSubCategory(token, (result) => {
        const convertedData = result.product_sub_category_list.map((item) => ({
          value: item.id,
          label: item.product_sub_category_name,
        }));
        // Sort the array alphabetically by product_sub_category_name
        //The localeCompare method is used for string comparison with sensitivity set to
        // 'base' to ensure case-insensitive sorting.
        convertedData.sort((a, b) =>
          a.label.localeCompare(b.label, undefined, { sensitivity: "base" })
        );
        setGetAllSubProductCategories(convertedData);
      })
    );
  }, []);

  const customStyles = {
    option: (base, { isSelected }) => {
      return {
        ...base,
        color: isSelected ? "#414141" : "#414141",
        backgroundColor: isSelected ? "#fafafa" : "#ffffff",
        cursor: "pointer",

        "&:hover": {
          backgroundColor: "#fafafa",
        },
        "&:focus": {
          backgroundColor: "#fafafa",
        },
      };
    },

    control: (defaultStyles) => ({
      ...defaultStyles,
      backgroundColor: "#ffffff",
      padding: "0",
      border: "none",
      borderBottom: "1px solid #E6E6E6",
      boxShadow: "none",
      borderRadius: "0",
      "&:hover": {
        borderColor: "#E6E6E6",
        backgroundColor: "transparent",
      },
      "&:focus": {
        borderColor: "#E6E6E6",
        backgroundColor: "transparent",
      },
    }),
    valueContainer: (provided) => ({
      ...provided,
      padding: "6px 0",
      maxHeight: "100px",
      overflowY: "auto"
    }),
    indicatorSeparator: (base) => ({
      ...base,
      display: "none",
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      svg: {
        fill: "#414141",
      },
    }),
    Input: (base) => ({
      ...base,
      padding: "0",
      margin: "0",
    }),

    singleValue: (defaultStyles) => ({
      ...defaultStyles,
      color: "#414141",
      margin: "0",
    }),
  };

  // this is for on slecting the category name it should diplay according sub category name.
  const onSelection = (subcategoryName, setFieldValue) => {
    dispatch(
      getProductsCategory(subcategoryName.value, token, (response) => {
        //  -----comment product field in build your vais------
        // const formatDate = response.products.map((item) => ({
        //   value: item.id,
        //   label: item.Product_name,
        // }))
        // formatDate.sort((a, b) =>
        //   a.label.localeCompare(b.label, undefined, { sensitivity: "base" })
        // );
        // setProductList(formatDate)

        const convertedData = response.product_category_list.map((item) => ({
          value: item.product_category_name,
          label: item.product_category_name,
        }));
        setAllProductsCategory(convertedData);

        // Automatically select the first product category (if available)
        if (convertedData.length > 0) {
          setFieldValue("product_category_name", convertedData[0].value);
        }
      })
    );
  };

  //parse function for abm content for both csv and XLSX
  const parseCSV = (csvContent, formValues) => {
    Papa.parse(csvContent, {
      complete: (result) => {
        const domainNames = result.data.map((row) => row.Domain);
        dispatchReduxActionSuppression(formValues, domainNames);
      },
      header: true,
      skipEmptyLines: true,
    });
  };
  const parseXLSX = (xlsxContent, formValues) => {
    const workbook = XLSX.read(xlsxContent, { type: "binary" });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const parsedData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
    const domainIndex = parsedData[0].indexOf("Domain");
    if (domainIndex === undefined)
      toast("provided file is empty, please use ABM template !");
    else {
      const domainNames = parsedData
        .slice(1)
        .map((row) => row[domainIndex])
        .filter((domain) => domain); // Filter out empty domain names
      if (domainNames.length === 0) {
        toast("Please Include Domain Name In File !", { autoClose: 1000 });
      } else {
        dispatchReduxActionSuppression(formValues, domainNames);
      }
    }
  };
  // dispatch redux action for verify abm
  const dispatchReduxActionSuppression = (formValues, domainNames) => {
    let topics = selectedMenus.map((item) => item.name);
    let payload = {
      product_category_name: formValues.product_category_name,
      product_sub_category_name: formValues.product_sub_category_name,
      location: formValues.location,
      topics: topics,
      domainNames: domainNames,
      page: 1,
      user_id: userId,
      vais_filter_name: vaisFilterName,
      is_save_filter: saveFilters,
      is_credit: true
    };
    // Add this block to include searchKey if available
    if (searchKey && searchKey.trim() !== "") {
      payload.bombora_url = searchKey;
    }
    if (isStaff) {
      payload = { ...payload, staff_id: userData.userInfo?.user_staff?.user };
    }
    localStorage.setItem("selectedCount", selectedCount); // Store selectedCount in localStorage
    localStorage.removeItem("icp_payload")
    dispatch(
      getIcpScore(payload, token, (result) => {
        setLoading(false);
        if (result?.status === 200) {
          navigate("/build-your-vais/vais-result", { state: { payload } });

          localStorage.setItem("icp_payload", JSON.stringify(payload));
          localStorage.setItem("location", "/build-your-vais/vais-result");
        } else if (result?.status === 400) {
          setIsDialogOpen(true);

        }

      })
    );

    // localStorage.setItem("icp_payload", JSON.stringify(payload));
    // navigate("/build-your-vais/vais-score", { state: payload });
  };
  const handleClose = () => setIsDialogOpen(false);
  const show_daily_limit_exide = () => {
    let limit = isSubscribed?.data?.per_day_search_limit || 0
    let data = {
      type: 'errorModal',
      heading: 'Per day search limit reached!',
      message: `You've used your ${limit} search credits for today. Please wait until tomorrow for them to refresh.`
    }
    setToastData(data);
    setIsVisible(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 4000);
  }

  const show_intent_topic_limt = () => {

    let data = {
      type: 'errorModal',
      heading: 'Intent topic limit is 12.',
      message: `You cannot use more than 12 intent topic. Please remove some intent topics to proceed.`
    }
    setToastData(data);
    setIsVisible(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 4000);
  }


  const handleSubmit = (values) => {
    if (isSubscribed?.data.is_free_trial && isSubscribed?.data?.per_day_search_limit_left === 0) {
      show_daily_limit_exide()
      return
    }
    let topics = selectedMenus.map((item) => item.name);
    if (topics.length > 12) {
      show_intent_topic_limt()
      setLoading(false);
      return false
    }
    setLoading(true);


    let payload = {
      product_category_name_view: getAllSubProductCategories.find(
        (option) =>
          option.value ===
          Number(values.product_sub_category_name)
      )?.label,
      product_category_name: values.product_category_name,
      product_sub_category_name: values.product_sub_category_name,
      location: values?.location,

      // product: values.product,   //-----comment product field in build your vais------
      topics: topics,
      page: 1,
      user_id: userId,
      vais_filter_name: vaisFilterName,
      is_save_filter: saveFilters,
      is_credit: true
    };

    // Add this block to include searchKey if available
    if (searchKey && searchKey.trim() !== "") {
      payload.bombora_url = searchKey;
    }
    if (isStaff) {
      payload = { ...payload, staff_id: userData.userInfo?.user_staff?.user };
    }
    if (values.uploadSuppressionFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        // Parse the uploaded file content based on file type
        const fileType = values.uploadSuppressionFile.name
          .split(".")
          .pop()
          .toLowerCase();
        if (fileType === "csv") {
          parseCSV(e.target.result, values);
        } else if (fileType === "xlsx") {
          parseXLSX(e.target.result, values);
        } else {
          toast.error("Unsupported file type");
        }
      };
      reader.readAsBinaryString(values.uploadSuppressionFile);
    } else {
      localStorage.setItem("selectedCount", selectedCount); // Store selectedCount in localStorage
      localStorage.removeItem("icp_payload")
      dispatch(
        getIcpScore(payload, token, (result) => {
          setLoading(false);
          if (result?.status === 200) {
            navigate("/build-your-vais/vais-result", { state: { payload } });

            localStorage.setItem("icp_payload", JSON.stringify(payload));
            localStorage.setItem("location", "/build-your-vais/vais-result");
          } else if (result?.status === 400) {
            setIsDialogOpen(true);

          }

        })
      );
      // localStorage.setItem("icp_payload", JSON.stringify(payload));
      // navigate("/build-your-vais/vais-score", { state: payload });
    }
  };
  const downloadTemplate = (templateFileName) => {
    // Construct the URL for the Excel template file
    const templateUrl = excelTemplate;

    // Use file-saver library to trigger the download
    saveAs(templateUrl, templateFileName);
  };
  // Function to handle adding a menu to selectedMenus and removing from menuOptions
  const handleMenuChange = (menuValue) => {
    const menuToAdd = menuOptions.find((menu) => menu.id === menuValue);
    if (menuToAdd && !selectedMenus.some((menu) => menu.id === menuToAdd.id)) {
      setSelectedMenus((prevSelected) => [...prevSelected, menuToAdd]);
      setMenuOptions((prevOptions) =>
        prevOptions.filter((menu) => menu.id !== menuToAdd.id)
      );
    }
  };
  // Function to handle removing a menu from selectedMenus and adding back to menuOptions
  const handleMenuRemove = (menuValue) => {
    const menuToMoveBack = selectedMenus.find((menu) => menu.id === menuValue);
    if (menuToMoveBack) {
      const isInTopicDataUrl = topicUrlList.some(
        (menu) => menu.id === menuValue
      );

      setSelectedMenus((prevSelected) =>
        prevSelected.filter((menu) => menu.id !== menuValue)
      );
      if (!isInTopicDataUrl) {
        setMenuOptions((prevOptions) => [...prevOptions, menuToMoveBack]);
      }
    }
  };

  const itemTemplate = (option) => {
    const isSelected = selectedMenus.some((item) => item.id === option.id);

    return (
      <div
        className="itemtemplate"
        onClick={(e) => {
          e.stopPropagation();
          handleMenuChange(option.id);
        }}
      >
        <span className="p-mr-2">{option.name}</span>

        {!isSelected && (
          <button
            type="button"
            className="menu-plus"
            onClick={(e) => {
              e.stopPropagation();
              handleMenuChange(option.id);
            }}
          >
            <i className="pi pi-plus"></i>
          </button>
        )}
      </div>
    );
  };


  const itemTemplate2 = (option) => {
    return (
      <div
        style={{ display: "flex", justifyContent: "space-between" }}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <span className="p-mr-2">{option.name}</span>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleMenuRemove(option.id);
          }}
          className="menu-plus"
        >
          <i className="pi pi-minus"></i>
        </button>
      </div>
    );
  };

  const filterTemplate = () => {
    return (
      <div>

        <div className="flex gap-3 mb-2" style={{ position: "sticky" }}>

          <IconField iconPosition="right">
            <InputText
              className="p-inputtext-sm"
              style={{
                border: "none",
                borderBottom: "1px solid #E6E6E6",
                width: "100%",
              }}
              placeholder="Search"
              value={searchTopicKey}
              onChange={(e) => setSearchTopicKey(e.target.value)}
            />
            <InputIcon className="pi pi-search"></InputIcon>
          </IconField>
        </div>
        <Dropdown
          options={categoryOptions} // Ensure categoryOptions is defined
          style={{
            border: "none",
            borderBottom: "1px solid #E6E6E6",
            width: "100%",
          }}
          placeholder="Filter Topics By Category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.value)}
          optionLabel="label" // Assuming categoryOptions has { label: 'Category Label', value: 'categoryValue' }
          showClear
        />
        <Dropdown
          options={themeOptions} // Ensure themeOptions is defined
          style={{
            border: "none",
            borderBottom: "1px solid #E6E6E6",
            width: "100%",
            marginTop: "10px",
          }}
          placeholder="Filter Topics By Theme"
          value={selectedTheme}
          onChange={(e) => setSelectedTheme(e.value)}
          optionLabel="label" // Assuming themeOptions has { label: 'Theme Label', value: 'themeValue' }
          showClear
        />
      </div>
    );
  };

  useEffect(() => {
    setLoadingTopic(true)
    dispatch(
      getAllTopics(token, (result) => {
        setMenuOptions(result);
        setAllMenu(result);
        const uniqueCategories = [
          ...new Set(result.map((option) => option.category)),
        ].map((category) => ({ label: category, value: category }));
        setCategoryOptions(uniqueCategories);
        const uniqueThemes = [
          ...new Set(result.map((option) => option.theme)),
        ].map((theme) => ({ label: theme, value: theme }));
        setThemeOptions(uniqueThemes);
        setLoadingTopic(false)
      })
    );
  }, []);

  const handleSearch = () => {
    if (searchKey != "") {
      dispatch(
        getAllTopicsWithUrl(searchKey, token, (result) => {
          if (Array.isArray(result?.topics)) {
            setSelectedMenus((prevSelected) => [
              ...prevSelected,
              ...result.topics.filter(
                (topic) =>
                  !prevSelected.some((selected) => selected.id === topic.id)
              ),
            ]);
            alert(`${result?.topics.length} topics were found.`);
            setTopicListUrlData(result?.topics);
          } else {
            toast.warning(result);
          }
        })
      );
    }
  };

  // Save Searches
  const [openModal, setOpenModal] = useState(false);
  const [saveFilters, setsaveFilters] = useState(false);
  const [vaisFilterName, setvaisFilterName] = useState('');
  const [OpenSaveFiltersFileNameModal, setOpenSaveFiltersFileNameModal] = useState(false);

  const onClose = () => {
    setOpenModal(false);
  };


  const handleSaveSearch = () => {
    setIsSaving(true);

    // Simulate loading delay (e.g., fetching saved searches)
    setTimeout(() => {
      setOpenModal(true);
      setIsSaving(false);
    }, 1000); // adjust time as needed
  };

  const handleSaveFilterNameModel = (value) => {
    if (value) {
      setOpenSaveFiltersFileNameModal(true)
    } else {
      setsaveFilters(false);
    }
  }

  const patchfilterValue = (data) => {
    if (formikRef.current) {
      formikRef.current.setValues(data) // Reset to initialValues
    }

    setInitialValues(data)
    if (data.bombora_url) {

      setSearchKey(data.bombora_url);
    } else {
      setSearchKey(""); // Clear if not present
    }
    let topics = allMenus.filter(ele => Array.isArray(data.topics) && data.topics.includes(ele.name));
    setSelectedMenus(topics)
    onSelection({ value: data.product_sub_category_name }, (name, value) => {

      setInitialValues((pre => ({
        ...pre,
        "product_category_name": value,
        // "product": data.product[0]   /// comment it for now we are not search through product

      })))
      setMenuOptions((prevOptions) =>
        allMenus.filter((menu) => !topics.includes(menu))
      );

    })

    // 
    setOpenModal(false)
  }

  const CloseSaveFiltersFileNameModal = () => {
    setOpenSaveFiltersFileNameModal(false)
    setsaveFilters(false)
  }

  const submitSaveFiltersFileNameModal = (name) => {
    if (name) {
      setOpenSaveFiltersFileNameModal(false)
      setvaisFilterName(name);
      setsaveFilters(true);
    }
  }
  // Save Searches END

  // loader with message 

  const getRandomMessage = () => {
    const randomIndex = Math.floor(Math.random() * loaderMessages.length);
    return loaderMessages[randomIndex];
  };

  useEffect(() => {
    let interval;

    if (loading) {
      // Set the initial message
      setRandomMessage(getRandomMessage());

      // Change the message every 5 seconds
      interval = setInterval(() => {
        setRandomMessage(getRandomMessage());
      }, 4000);
    } else {
      // Clear interval when loading is false
      clearInterval(interval);
    }

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, [loading]);

  return (
    <>
      {loading && <>
        <center>
          <p

            style={{
              zIndex: "9999",
              margin: "auto !important",
              textAlign: "center",
              color: "white",
              position: "fixed",
              top: "75%",
              left: "50%",
              transform: "translateX(-50%)",
              width: "40%",
              fontWeight: "200",
              fontSize: "18px"
            }}
          // className="highlight-text"
          >
            {loading && randomMessage}
          </p>
        </center>

      </>}
      {openModal ? (
        <SaveSearch
          showModal={openModal}
          onClose={onClose}
          type="Apply Searches"
          patchfilterValue={patchfilterValue}
        />
      ) : null}
      {OpenSaveFiltersFileNameModal ? (<SaveSearchFileName showFileNameModal={OpenSaveFiltersFileNameModal} onClose={CloseSaveFiltersFileNameModal} submitSaveFiltersFileNameModal={submitSaveFiltersFileNameModal} type='ICP' />) : null}
      <div>
        <ToastModal
          type={toastData.type}
          heading={toastData.heading}
          message={toastData.message}
          isVisible={isVisible}
          onClose={() => setIsVisible(false)}
        />
      </div>
      <div className="pageHeadingBlock commonHeading commonHeadBlock">
        <div className="pageTitle">
          <h3 className="m-0">Build Your VAIS</h3>
        </div>
        {/* {!isStaff ? ( */}
        <Information getUserSubscriptionData={getUserSubscriptionData} />
        {/* ) : (
          <InformationStaff staffDetails={staffDetails} />
        )} */}
      </div>
      <div className="pageContentBlock">
        <div className="row">
          <div className="col-12 col-lg-12">
            <div className="contentWrapper buildYourICP">
              <Formik
                innerRef={formikRef}
                initialValues={initialValues}
                enableReinitialize
                onSubmit={handleSubmit}
                validationSchema={BuildYourIcpValidation}
              >
                {({
                  values,
                  handleChange,
                  handleBlur,
                  setFieldValue,
                  setFieldTouched,
                  touched,
                  errors,

                }) => (
                  <Form className="buildYourICPForm">
                    <div className="row">
                      <div className="col-12 col-md-6">
                        <div className="icpForm">
                          <div className="form-group">
                            {/* added */}
                            <div className="row m-0 d-flex align-items-center justify-content-center" >
                              <div className="col-7 col-md-7 p-0">
                                <label>My Product Subcategory{" "}<span className="required">&#42;</span></label>{" "}
                              </div>
                              <div className="col-5 col-md-5 p-0 d-flex justify-content-end">
                                <button
                                  disabled={isSaving || !(menuOptions && menuOptions.length > 0)}
                                  type="button"
                                  className="recent-searches-button d-flex align-items-center gap-2"
                                  onClick={handleSaveSearch}
                                  style={{ paddingLeft: '25px', width: '12.5rem' }}
                                >
                                  {menuOptions.length === 0 ? "Loading..." : (
                                    <>
                                      Favorites
                                      {/* Heart icon shown only when not saving */}
                                      {!isSaving && (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="#E55426" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                                          <path d="M12 21C12 21 4 13.5 4 8.5C4 5.46 6.46 3 9.5 3C11.04 3 12.54 3.81 13.28 5.09C14.02 3.81 15.52 3 17.06 3C20.1 3 22.56 5.46 22.56 8.5C22.56 13.5 15 21 15 21H12Z" />
                                        </svg>
                                      )}
                                    </>
                                  )}
                                  <span
                                    className={`spinner-border spinner-border-sm ${isSaving ? '' : 'invisible'}`}
                                    role="status"
                                    aria-hidden="true"
                                    style={{ width: "1.2rem", height: "1.3rem" }}
                                  ></span>
                                </button>
                              </div>

                            </div>
                            <Select
                              options={getAllSubProductCategories}
                              styles={customStyles}
                              // className="selectBox"
                              className={`selectBox ${errors.product_sub_category_name
                                ? "error-input"
                                : ""
                                }`}
                              placeholder="Select"
                              name="product_sub_category_name"
                              value={getAllSubProductCategories.find(
                                (option) =>
                                  option.value ===
                                  Number(values.product_sub_category_name)
                              )}
                              onChange={(selectedOption) => {
                                setFieldValue(
                                  "product_sub_category_name",
                                  selectedOption.value
                                );
                                onSelection(selectedOption, setFieldValue); // Pass the selected option and setFieldValue
                              }}
                              onBlur={handleBlur}
                            />
                            {errors.product_sub_category_name && (
                              <div className="error-message">
                                {errors.product_sub_category_name}
                              </div>
                            )}
                          </div>
                          <div className="form-group">
                            <label>My Product Category </label>
                            <Select
                              options={getAllProductsCategory}
                              styles={customStyles}
                              className="selectBox"
                              placeholder="Select"
                              name="product_category_name"
                              value={getAllProductsCategory.find(
                                (option) =>
                                  option.value === values.product_category_name
                              )}
                              onChange={(selectedOption) => {
                                setFieldValue(
                                  "product_category_name",
                                  selectedOption.value
                                );
                              }}
                              onBlur={handleBlur}
                              isDisabled={!!values.product_sub_category_name} // Disable if product subcategory is selected
                            />
                            {/* <span className="passwordHint">
                              For Product Category select
                              <strong> My Product Subcategory</strong>
                            </span> */}
                          </div>
                          {/* ---comment product field in build your vais  */}
                          {/* <div className="form-group">
                            <label>
                              Product{" "}
                              
                            </label>
                            <Select
                              options={productList}
                              styles={customStyles}
                              className="selectBox"
                              placeholder="Select"
                              name="location"
                              value={productList.find((option) => option.value === values?.product)}
                              onChange={(selectedOption) => {
                                setFieldValue("product", selectedOption ? selectedOption.value : null);
                              }}
                              onBlur={handleBlur}
                            />
                            {errors.product && (
                              <div className="error-message">
                                {errors.product}
                              </div>
                            )}
                          </div> */}
                          <div className="form-group">
                            <label>
                              Geolocation{" "}
                              <span className="required">&#42;</span>
                            </label>
                            <Select
                              options={getAllGeolocation}
                              styles={customStyles}
                              className="selectBox"
                              placeholder="Select"
                              name="location"
                              value={getAllGeolocation.filter((option) => {
                                if (values?.location) {
                                  return values.location.includes(option.value);
                                }
                                return false;
                              })}
                              onChange={(selectedOptions) => {
                                if (
                                  selectedOptions.some(
                                    (option) => option.value === "selectAll"
                                  )
                                ) {
                                  if (
                                    selectedOptions.length ===
                                    getAllGeolocation.length
                                  ) {
                                    // If all options are selected, deselect all
                                    setFieldValue("location", []);
                                  } else {
                                    // Select all options except "Select All"
                                    setFieldValue(
                                      "location",
                                      getAllGeolocation
                                        .filter(
                                          (option) =>
                                            option.value !== "selectAll"
                                        )
                                        .map((option) => option.value)
                                    );
                                  }
                                } else {
                                  // Normal selection
                                  setFieldValue(
                                    "location",
                                    selectedOptions
                                      ? selectedOptions.map(
                                        (option) => option.value
                                      )
                                      : []
                                  );
                                }
                              }}
                              isMulti
                              onBlur={handleBlur}
                            />
                            {errors.location && (
                              <div className="error-message">
                                {errors.location}
                              </div>
                            )}
                          </div>
                          <div className="form-group">
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                              }}
                            >
                              <label>
                                Select Intent Topic{" "}
                                <span className="required">&#42;</span>
                              </label>
                              <a id='ibutton-tooltip' >
                                <span style={{ marginLeft: "8px" }}>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="feather feather-info"
                                  >
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <line
                                      x1="12"
                                      y1="16"
                                      x2="12"
                                      y2="12"
                                    ></line>
                                    <line
                                      x1="12"
                                      y1="8"
                                      x2="12.01"
                                      y2="8"
                                    ></line>
                                  </svg>
                                </span>
                              </a>
                              {tooltip}
                            </div>
                            <div>
                              <span className="passwordHint">
                                Generate Topics (
                                {errorMessage && (
                                  <span className="err-msg err">
                                    {errorMessage}
                                  </span>
                                )}
                                {confirmationMessage && (
                                  <span className="err-msg green">
                                    {confirmationMessage}
                                  </span>
                                )}
                                )
                              </span>
                              <div className="flex gap-3 mb-4">

                                <IconField iconPosition="right">
                                  <InputText
                                    className="p-inputtext-sm"
                                    style={{
                                      border: "none",
                                      borderBottom: "1px solid #E6E6E6",
                                      width: "100%",
                                      fontSize: "10px",
                                    }}
                                    placeholder="http://www.bombora.com"
                                    value={searchKey}
                                    onChange={(e) =>
                                      setSearchKey(e.target.value)
                                    }
                                  />
                                  <InputIcon
                                    onClick={() => handleSearch()}
                                    className="pi pi-search search-icon"
                                  ></InputIcon>
                                </IconField>
                              </div>
                            </div>

                            <span className="passwordHint">Topics</span>
                            <div>
                              <div
                                className="flex gap-3 mb-2"
                                style={{ position: "sticky" }}
                              >
                                <IconField iconPosition="right">
                                  <InputText
                                    className="p-inputtext-sm"
                                    style={{
                                      border: "none",
                                      borderBottom: "1px solid #E6E6E6",
                                      width: "100%",
                                      fontSize: "10px",
                                    }}
                                    placeholder="Search"
                                    onChange={(e) =>
                                      setSearchTopicKey(e.target.value)
                                    }
                                  />
                                  <InputIcon className="pi pi-search"></InputIcon>
                                </IconField>
                              </div>
                              <Dropdown
                                options={categoryOptions} // Ensure categoryOptions is defined
                                style={{
                                  border: "none",
                                  borderBottom: "1px solid #E6E6E6",
                                  width: "100%",
                                }}
                                placeholder="Filter Topics By Category"
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.value)}
                                optionLabel="label" // Assuming categoryOptions has { label: 'Category Label', value: 'categoryValue' }
                                showClear
                              />
                              <Dropdown
                                options={themeOptions} // Ensure themeOptions is defined
                                style={{
                                  border: "none",
                                  borderBottom: "1px solid #E6E6E6",
                                  width: "100%",
                                  marginTop: "10px",
                                }}
                                placeholder="Filter Topics By Theme"
                                value={selectedTheme}
                                onChange={(e) => setSelectedTheme(e.value)}
                                optionLabel="label" // Assuming themeOptions has { label: 'Theme Label', value: 'themeValue' }
                                showClear
                              />
                            </div>
                            <div className="row list-box ">
                              <div className="col-md-6">
                                {!loadingTopic ? (
                                  <>
                                    {filteredOptions.length ? (
                                      <VirtualScroller
                                        ref={scrollerRef}
                                        items={filteredOptions}
                                        showLoader
                                        delay={50}
                                        loadingTemplate={loadingTemplate}
                                        itemSize={10}
                                        lazy
                                        onChange={(e) => handleMenuChange(e.value)}
                                        className="border-1 surface-border border-round"
                                        value={menuOptions
                                          .filter((menu) =>
                                            selectedMenus.some((selected) => selected.id === menu.id)
                                          )
                                          .map((menu) => menu.id)}
                                        style={{ height: "400px" }}
                                        optionLabel="label"
                                        optionValue="id"
                                        itemTemplate={itemTemplate}
                                      />
                                    ) : (
                                      <div style={{ height: "50px" }}>
                                        <div>No data found!</div>
                                      </div>

                                    )}
                                  </>
                                ) : (
                                  <LoadingComponent />
                                )}
                              </div>
                              <div className="col-md-6">
                                <ListBox
                                  value={selectedMenus?.map((menu) => menu.id)} // Map selectedMenus to array of values
                                  options={selectedMenus}
                                  className="list-box-item"
                                  filter
                                  filterBy="name"
                                  onChange={(e) => handleMenuRemove(e.value)}
                                  // multiple
                                  optionLabel="label"
                                  optionValue="id"
                                  itemTemplate={itemTemplate2}
                                />
                              </div>
                            </div>
                            <div className="bombara-logo">
                              <img src={bomboralogo} alt="bomboralogo" />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-md-6">
                        <div className="icpForm">
                          {/* <div className="form-group"></div> */}
                          {/* <div className="form-group"></div> */}

                          <div className="form-group">
                            <label>Upload Suppression file</label>
                            <div className="uploadedFile">
                              <div className="fileDetilsItem">
                                <p>
                                  <img src={excelIcon} alt="" />
                                  Suppression Template
                                </p>
                                <div className="downloadFile">
                                  <button
                                    type="button"
                                    className="btn btnPrimaryOutline"
                                    onClick={() =>
                                      downloadTemplate("Suppression.csv")
                                    }
                                  >
                                    Download
                                  </button>
                                </div>
                              </div>
                            </div>
                            <div className="uploadDocuments">
                              <input
                                className="uploadDocInput"
                                id="userImgUploadInput"
                                type="file"
                                accept=".xlsx,.csv"
                                onChange={(e) => {
                                  const file = e.target.files[0];
                                  if (file) {
                                    const fileType = file.name.split(".").pop().toLowerCase();
                                    const allowedTypes = ["csv", "xlsx"];

                                    if (!allowedTypes.includes(fileType)) {
                                      toast.error("Unsupported file type");
                                      e.target.value = ""; // Reset the input so user can reselect
                                      return;
                                    }

                                    setFieldValue("uploadSuppressionFile", e.currentTarget.files[0]);
                                  }
                                  // Optional: reset input to allow re-selecting same file again
                                  // e.target.value = "";
                                }}
                              />
                              <div className="uploadDocContent">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="49"
                                  height="34"
                                  viewBox="0 0 49 34"
                                  fill="none"
                                >
                                  <path
                                    d="M39.5063 12.9996C38.8205 9.52414 36.9493 6.39456 34.2123 4.14543C31.4754 1.8963 28.0425 0.667168 24.5 0.667969C18.5996 0.667969 13.475 4.0163 10.9229 8.9163C7.92214 9.24058 5.14706 10.6624 3.13087 12.9084C1.11469 15.1545 -0.000350558 18.0664 8.26727e-08 21.0846C8.26727e-08 27.8426 5.49208 33.3346 12.25 33.3346H38.7917C44.4267 33.3346 49 28.7613 49 23.1263C49 17.7363 44.8146 13.3671 39.5063 12.9996ZM28.5833 19.043V27.2096H20.4167V19.043H14.2917L23.7854 9.54922C24.1938 9.14089 24.8267 9.14089 25.235 9.54922L34.7083 19.043H28.5833Z"
                                    fill="#414141"
                                    fillOpacity="0.2"
                                  />
                                </svg>
                                {values?.uploadSuppressionFile?.name ? (
                                  <p>{values?.uploadSuppressionFile?.name}</p>
                                ) : (
                                  <p className="m-0">
                                    Select/Drop File to upload
                                    <span className="m-0">
                                      Must be .xlsx / .csv file / Use the sample
                                      template.
                                    </span>
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="form-group formSubmit mb-3 d-flex align-items-center justify-content-between mt-3">
                            <div className="form-check me-4">
                              <input className="form-check-input" type="checkbox" role="switch" id="form-switch" name="saveFilters" checked={saveFilters} style={{ position: 'relative', bottom: '2px' }} onChange={(e) => handleSaveFilterNameModel(e.target.checked)} />
                              <label className="form-check-label savetext" htmlFor="form-switch">Remember search</label>
                            </div>
                            <label className="form-check-label savetext">

                              {
                                getUserSubscriptionData?.per_day_data_download_credit_used != null &&
                                  getUserSubscriptionData?.per_day_data_download_limit != null ? (
                                  `${getUserSubscriptionData.per_day_data_download_credit_used}/${getUserSubscriptionData.per_day_data_download_limit} Utilized Per Day Download`
                                ) : (
                                  <Skeleton width={200} height={10} />
                                )
                              }
                            </label>
                          </div>
                          <div className="form-group formSubmit mb-3 d-flex align-items-center justify-content-between">
                            <button
                              type="submit"
                              disabled={
                                errorMessage !== "" ||
                                selectedMenus.length <= 0 || // Ensure selectedMenus.length is more than 0
                                selectedMenus.length > 12 || // Ensure selectedMenus.length is less than or equal to 12
                                !values.product_sub_category_name ||
                                values.location.length === 0
                              }
                              className="btn update buildVais"
                            >
                              Build your VAIS
                            </button>
                          </div>

                          <p className="icpNote">
                            <strong>Note: </strong> Each 'Build your VAIS' action deducts one search from your available search credits.
                          </p>
                        </div>
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
          {isDialogOpen && (
            <SearchModel
              isDialogOpen={isDialogOpen}
              message={
                <><div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', lineHeight: '1.4rem' }}>
                  <img style={{ width: '6rem', }} src={errorIcon} alt="error_icon" /><br />
                  <label className="text-center"><b>Search Limit Reached!!!</b><br /><br /> You don't have any credit remaining.</label>
                </div>
                </>
              }
              handleClose={handleClose}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default BuildYourICP;