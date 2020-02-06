import React, { useState, useEffect } from "react";
import "./App.css";
import Card from "./components/Card";
import { Car, Filter } from "./common/Interface";
import CheckBox from "./components/CheckBox";
import ColorPicker from "./components/ColorPicker";
import MileageSlider from "./components/MileageSlider";

const App = () => {
  const [cars, setCars] = useState([]);
  const [currentColor, setColor] = useState("None");
  const [sunroof, setSunRoof] = useState(false);
  const [fourWheelDrive, set4WD] = useState(false);
  const [lowMileage, setLowMileage] = useState(false);
  const [powerWindow, setPowerWindow] = useState(false);
  const [carNav, setCarNav] = useState(false);
  const [heatedSeats, setHeatedSeats] = useState(false);
  const [matchAll, setMatch] = useState(false);
  const [mileThreshold, setMiles] = useState(0);

  useEffect(() => {
    const fetchCars = async () => {
      const response = await httpData("/api/cars");
      setCars(response);
    };

    fetchCars();
  }, []);

  async function httpData(url: string) {
    const response = await fetch(url, {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
      },
      redirect: "follow",
      referrer: "no-referrer"
    });

    return await response.json();
  }
  const handleKeyboard = (event: React.KeyboardEvent, color: string) => {
    if (event.which === 13 || event.which === 32) {
      setColor(color);
    }
  };
  function filterColor(currentCars: Car[], color: string): Car[] {
    if (color === "None") {
      return currentCars;
    }
    return currentCars.filter((car: Car) => car.color === color);
  }

  function filterSunroof(currentCars: Car[], checked: boolean): Car[] {
    if (!checked) {
      return currentCars;
    }
    return currentCars.filter((car: Car) => car.hasSunroof);
  }

  function filterFourWheel(currentCars: Car[], checked: boolean) {
    if (!checked) {
      return currentCars;
    }
    return currentCars.filter((car: Car) => car.isFourWheelDrive);
  }

  function filterLowMiles(currentCars: Car[], checked: boolean) {
    if (!checked) {
      return currentCars;
    }
    return currentCars.filter((car: Car) => car.hasLowMiles);
  }

  function filterPowerWindows(currentCars: Car[], checked: boolean) {
    if (!checked) {
      return currentCars;
    }
    return currentCars.filter((car: Car) => car.hasPowerWindows);
  }

  function filterNavigation(currentCars: Car[], checked: boolean) {
    if (!checked) {
      return currentCars;
    }
    return currentCars.filter((car: Car) => car.hasNavigation);
  }

  function filterHeatedSeats(currentCars: Car[], checked: boolean) {
    if (!checked) {
      return currentCars;
    }
    return currentCars.filter((car: Car) => car.hasNavigation);
  }

  const extractColors = (cars: Car[]): string[] => {
    const colors: Set<string> = new Set();
    cars.forEach((car: Car) => {
      colors.add(car.color);
    });
    return Array.from(colors);
  };

  const matchOptions = (currentCars: Car[]): Car[] => {
    const set: Set<string> = new Set();

    /*if car color is part of the optional car features)
    if(currentColor !== 'None') {
      currentCars.forEach((car:Car) => {
        if(car.color === currentColor) {
          set.add(car._id)
        }
      });
    }
    */
    if (sunroof) {
      currentCars.forEach((car: Car) => {
        if (car.hasSunroof) {
          set.add(car._id);
        }
      });
    }
    if (fourWheelDrive) {
      currentCars.forEach((car: Car) => {
        if (car.isFourWheelDrive) {
          set.add(car._id);
        }
      });
    }
    if (lowMileage) {
      currentCars.forEach((car: Car) => {
        if (car.hasLowMiles) {
          set.add(car._id);
        }
      });
    }
    if (powerWindow) {
      currentCars.forEach((car: Car) => {
        if (car.hasPowerWindows) {
          set.add(car._id);
        }
      });
    }
    if (carNav) {
      currentCars.forEach((car: Car) => {
        if (car.hasNavigation) {
          set.add(car._id);
        }
      });
    }
    if (heatedSeats) {
      currentCars.forEach((car: Car) => {
        if (car.hasHeatedSeats) {
          set.add(car._id);
        }
      });
    }

    const result: Car[] = currentCars.filter((car: Car) => set.has(car._id));
    return result;
  };

  const getFilters = (): Filter[] => {
    const filters: Filter[] = [];
    if (sunroof) {
      filters.push({ feature: "Sunroof", name: "hasSunroof" });
    }
    if (fourWheelDrive) {
      filters.push({ feature: "Four Wheel Drive", name: "isFourWheelDrive" });
    }
    if (lowMileage) {
      filters.push({ feature: "Low Mileage", name: "hasLowMiles" });
    }
    if (powerWindow) {
      filters.push({ feature: "Power Windows", name: "hasPowerWindows" });
    }
    if (carNav) {
      filters.push({ feature: "Car Navigation", name: "hasNavigation" });
    }
    if (heatedSeats) {
      filters.push({ feature: "Heated Seats", name: "hasHeatedSeats" });
    }
    return filters;
  };

  const getMaxMiles = (currentCars: Car[]): number => {
    return currentCars.reduce((acc: number, car: Car) => {
      if (car.mileage > acc) {
        acc = car.mileage;
      }
      return acc;
    }, 0);
  };

  const filterByMiles = (currentCars: Car[]): Car[] => {
    if (mileThreshold === 0) {
      return currentCars;
    }
    return currentCars.filter((car: Car) => car.mileage <= mileThreshold);
  };

  let currentCars: Car[] = cars;
  const maxMiles = getMaxMiles(currentCars);
  const carColors = extractColors(currentCars);
  currentCars = filterColor(currentCars, currentColor);
  const filters = getFilters();
  if (matchAll) {
    currentCars = filterSunroof(currentCars, sunroof);
    currentCars = filterFourWheel(currentCars, fourWheelDrive);
    currentCars = filterLowMiles(currentCars, lowMileage);
    currentCars = filterPowerWindows(currentCars, powerWindow);
    currentCars = filterNavigation(currentCars, carNav);
    currentCars = filterHeatedSeats(currentCars, heatedSeats);
  } else if (filters.length > 0) {
    currentCars = matchOptions(currentCars);
  }
  currentCars = filterByMiles(currentCars);

  return (
    <React.Fragment>
      <header className="container">
        <h1>Young's Car Dealership</h1>
        <p className="lead">
          We have a great selection of cars. Here are some options you can
          choose from!
        </p>
      </header>
      <div className="container filtering-container">
        <h3>Filtering Options:</h3>
        <h5>Car Color</h5>
        <div className="color-container">
          <ColorPicker
            currentColor={currentColor}
            thisColor="None"
            setColor={setColor}
            handleKeyBoard={handleKeyboard}
            text="All"
            exception={true}
          />
          {carColors.map((color: string) => (
            <ColorPicker
              key={color + currentColor}
              currentColor={currentColor}
              thisColor={color}
              setColor={setColor}
              handleKeyBoard={handleKeyboard}
              text={color}
            />
          ))}
        </div>
        <h5>
          Car Options
          <CheckBox
            isMarked={matchAll}
            setter={setMatch}
            text="Match All Below Options"
            overAll={true}
          />
        </h5>
        <CheckBox isMarked={sunroof} setter={setSunRoof} text="Sunroof" />
        <CheckBox
          isMarked={fourWheelDrive}
          setter={set4WD}
          text="Four Wheel Drive"
        />
        <CheckBox
          isMarked={lowMileage}
          setter={setLowMileage}
          text="Low Mileage"
        />
        <CheckBox
          isMarked={powerWindow}
          setter={setPowerWindow}
          text="Power Window"
        />
        <CheckBox isMarked={carNav} setter={setCarNav} text="Navigation" />
        <CheckBox
          isMarked={heatedSeats}
          setter={setHeatedSeats}
          text="Heated Seat"
        />
      </div>
      {maxMiles > 0 && <MileageSlider maxMile={maxMiles} setter={setMiles} />}

      <div className="grid">
        {currentCars.length > 0 ? (
          currentCars.map((car: Car) => (
            <Card key={car._id} car={car} filters={filters} />
          ))
        ) : (
          <h2 className="error-message">
            Sorry we do not your selected options in stock
          </h2>
        )}
      </div>
    </React.Fragment>
  );
};

export default App;
