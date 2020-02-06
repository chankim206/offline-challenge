import React, { ReactElement } from "react";
import { Car, Filter } from "../common/Interface";
import "./Card.css";

interface Props {
  car: Car;
  filters: Filter[];
}

export default function Card({ car, filters }: Props): ReactElement {
  const normalFeatures: Filter[] = [
    { feature: "Sunroof", name: "hasSunroof" },
    { feature: "Four Wheel Drive", name: "isFourWheelDrive" },
    { feature: "Low Mileage", name: "hasLowMiles" },
    { feature: "Power Windows", name: "hasPowerWindows" },
    { feature: "Car Navigation", name: "hasNavigation" },
    { feature: "Heated Seats", name: "hasHeatedSeats" }
  ];
  return (
    <div className="bg-light text-center overflow-hidden">
      <div className="summary">
        <h2>
          {car.year} {car.make} {car.color}
        </h2>
        <p className="money">&#36;{car.price}</p>
        <p className="lead">{car.mileage}</p>
      </div>
      <h5>Available Features</h5>
      <div className="feature-grid">
        {filters.length > 0 &&
          filters.map((item: Filter) => (
            <div key={item.name} className="feature-container">
              {car[item.name] === true ? (
                <i className="fas fa-check-circle avail"></i>
              ) : (
                <i className="fas fa-times-circle not-avail"></i>
              )}
              <p className="feature-name">{item.feature}</p>
            </div>
          ))}
        {filters.length === 0 &&
          normalFeatures.map(
            (item: Filter) =>
              car[item.name] === true && (
                <div key={item.name} className="feature-container">
                  <i className="fas fa-check-circle avail"></i>
                  <p className="feature-name">{item.feature}</p>
                </div>
              )
          )}
      </div>
    </div>
  );
}
