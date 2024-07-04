import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import "./application.css"; // Import your CSS file

const CardSlider = ({ cards }) => {
  const carouselRef = useRef(null);
  let isDragging = false,
    startX,
    startScrollLeft,
    timeoutId;

  const nav = useNavigate(); // Initialize useNavigate hook from react-router-dom

  useEffect(() => {
    const carousel = carouselRef.current;
    const firstCardWidth = carousel.querySelector(".card").offsetWidth;
    const arrowBtns = document.querySelectorAll(".wrapper i");
    const carouselChildrens = [...carousel.children];
    let isAutoPlay = true;

    // Get the number of cards that can fit in the carousel at once
    let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

    // Insert copies of the last few cards to beginning of carousel for infinite scrolling
    carouselChildrens
      .slice(-cardPerView)
      .reverse()
      .forEach((card) => {
        carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
      });

    // Insert copies of the first few cards to end of carousel for infinite scrolling
    carouselChildrens.slice(0, cardPerView).forEach((card) => {
      carousel.insertAdjacentHTML("beforeend", card.outerHTML);
    });

    // Scroll the carousel at appropriate position to hide first few duplicate cards on Firefox
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.offsetWidth;
    carousel.classList.remove("no-transition");

    // Add event listeners for the arrow buttons to scroll the carousel left and right
    arrowBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        carousel.scrollLeft +=
          btn.id === "left" ? -firstCardWidth : firstCardWidth;
      });
    });

    const dragStart = (e) => {
      isDragging = true;
      carousel.classList.add("dragging");
      startX = e.pageX;
      startScrollLeft = carousel.scrollLeft;
    };

    const dragging = (e) => {
      if (!isDragging) return;
      carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
    };

    const dragStop = () => {
      isDragging = false;
      carousel.classList.remove("dragging");
    };

    const infiniteScroll = () => {
      if (carousel.scrollLeft === 0) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.scrollWidth - 2 * carousel.offsetWidth;
        carousel.classList.remove("no-transition");
      } else if (
        Math.ceil(carousel.scrollLeft) ===
        carousel.scrollWidth - carousel.offsetWidth
      ) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove("no-transition");
      }
      clearTimeout(timeoutId);
      if (!carousel.closest(".wrapper").matches(":hover")) autoPlay();
    };

    const autoPlay = () => {
      if (window.innerWidth < 800 || !isAutoPlay) return;
      timeoutId = setTimeout(
        () => (carousel.scrollLeft += firstCardWidth),
        2500
      );
    };

    autoPlay();
    carousel.addEventListener("mousedown", dragStart);
    carousel.addEventListener("mousemove", dragging);
    document.addEventListener("mouseup", dragStop);
    carousel.addEventListener("scroll", infiniteScroll);

    return () => {
      carousel.removeEventListener("mousedown", dragStart);
      carousel.removeEventListener("mousemove", dragging);
      document.removeEventListener("mouseup", dragStop);
      carousel.removeEventListener("scroll", infiniteScroll);
    };
  }, []);
  const handleCardClick = (e, link) => {
    e.preventDefault();
    if (link) {
      window.location.href = link; // Navigate to the specified link
    }
  };
  

  return (
    <div className="wrapper">
      <i
        id="left"
        onClick={() =>
          (carouselRef.current.scrollLeft -=
            carouselRef.current.offsetWidth / 2)
        }
      >
        <ArrowLeftIcon />
      </i>
      <ul ref={carouselRef} className="carousel">
        {cards.map((card) => (
          <li
            key={card.id}
            className="card"
            
            style={{ backgroundImage: `url('${card.backgroundImage}')` }}
          >
            <div className="overlay" onClick={(e) => handleCardClick(e, card.link)}>
            <h2>{card.label}</h2>
            {card.link && (
              <a href={card.link} target="_blank" rel="noopener noreferrer">
                Visit
              </a>
            )}
         
            </div>
          </li>
        ))}
      </ul>
      <i
        id="right"
        onClick={() =>
          (carouselRef.current.scrollLeft +=
            carouselRef.current.offsetWidth / 2)
        }
      >
        <ArrowRightIcon />
      </i>
    </div>
  );
};

export default CardSlider;
