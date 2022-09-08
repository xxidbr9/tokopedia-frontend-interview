import { fireEvent, render, screen } from "@testing-library/react";
import { AnimeCard } from "ui/components";
import { AnimeMediaListItem } from "weboo-models";


const dummyData_1: AnimeMediaListItem = {
  "id": 5,
  "seasonYear": 2001,
  "genres": [
    "Action",
    "Drama",
    "Mystery",
    "Sci-Fi"
  ],
  "isAdult": true,
  "idMal": 5,
  "title": {
    "romaji": "Cowboy Bebop: Tengoku no Tobira",
    "english": "Cowboy Bebop: The Movie - Knockin' on Heaven's Door",
    "native": "カウボーイビバップ天国の扉",
    "userPreferred": "Cowboy Bebop: Tengoku no Tobira"
  },
  "description": "As the Cowboy Bebop crew travels the stars, they learn of the largest bounty yet, a huge 300 million Woolongs. Apparently, someone is wielding a hugely powerful chemical weapon, and of course the authorities are at a loss to stop it. The war to take down the most dangerous criminal yet forces the crew to face a true madman, with bare hope to succeed.\n<br><br>\n(Source: Anime News Network)",
  "type": "ANIME",
  "bannerImage": "https://s4.anilist.co/file/anilistcdn/media/anime/banner/5-VOcSZFepDDhm.jpg",
  "episodes": 1,
  "trailer": {
    "id": "kOH2_8MkgZY",
    "site": "youtube",
    "thumbnail": "https://i.ytimg.com/vi/kOH2_8MkgZY/hqdefault.jpg"
  },
  "coverImage": {
    "extraLarge": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx5-NozHwXWdNLCz.jpg",
    "large": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx5-NozHwXWdNLCz.jpg",
    "medium": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/small/bx5-NozHwXWdNLCz.jpg",
    "color": "#f13500"
  }
};


const dummyData_2: AnimeMediaListItem = {
  "id": 5,
  "seasonYear": 2001,
  "genres": [
    "Action",
    "Drama",
    "Mystery",
    "Sci-Fi"
  ],
  "idMal": 5,
  "title": {
    "romaji": "Cowboy Bebop: Tengoku no Tobira",
    "english": "",
    "native": "カウボーイビバップ天国の扉",
    "userPreferred": "Cowboy Bebop: Tengoku no Tobira"
  },
  "description": "As the Cowboy Bebop crew travels the stars, they learn of the largest bounty yet, a huge 300 million Woolongs. Apparently, someone is wielding a hugely powerful chemical weapon, and of course the authorities are at a loss to stop it. The war to take down the most dangerous criminal yet forces the crew to face a true madman, with bare hope to succeed.\n<br><br>\n(Source: Anime News Network)",
  "type": "ANIME",
  "bannerImage": "https://s4.anilist.co/file/anilistcdn/media/anime/banner/5-VOcSZFepDDhm.jpg",
  "episodes": 1,
  "trailer": null,
  "coverImage": {
    "extraLarge": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx5-NozHwXWdNLCz.jpg",
    "large": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx5-NozHwXWdNLCz.jpg",
    "medium": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/small/bx5-NozHwXWdNLCz.jpg",
    "color": "#f13500"
  }
};

const dummyData_3: AnimeMediaListItem = {
  "id": 5,
  "seasonYear": 2001,
  "genres": [
    "Action",
    "Drama",
    "Mystery",
    "Sci-Fi"
  ],
  "idMal": 5,
  "title": {
    "romaji": null,
    "english": null,
    "native": null,
    "userPreferred": null
  },
  "description": null,
  "type": "ANIME",
  "bannerImage": "https://s4.anilist.co/file/anilistcdn/media/anime/banner/5-VOcSZFepDDhm.jpg",
  "episodes": 1,
  "trailer": null,
  "coverImage": {
    "extraLarge": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx5-NozHwXWdNLCz.jpg",
    "large": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx5-NozHwXWdNLCz.jpg",
    "medium": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/small/bx5-NozHwXWdNLCz.jpg",
    "color": "#f13500"
  }
};


const dummyData_4: AnimeMediaListItem = {
  ...dummyData_3,
  "bannerImage": null,
}

const dummyData_5: AnimeMediaListItem = {
  ...dummyData_4,
  "coverImage": {
    ...dummyData_4.coverImage,
    extraLarge: null,
  },
}

const dummyData_6: AnimeMediaListItem = {
  ...dummyData_5,
  "coverImage": {
    ...dummyData_5.coverImage,
    large: null,
  },
}

const dummyData_7: AnimeMediaListItem = {
  ...dummyData_6,
  "coverImage": {
    ...dummyData_6.coverImage,
    medium: null,
  },
}


describe("AnimeCard", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<AnimeCard data={dummyData_1} />);
    expect(baseElement).toBeTruthy();
  });

  it("should render successfully if there is no english title", () => {
    const { baseElement } = render(<AnimeCard data={dummyData_2} isLast />);
    expect(baseElement).toBeTruthy();
  });

  it("should render successfully if there is no title and description", () => {
    const { baseElement } = render(<AnimeCard data={dummyData_3} />);
    expect(baseElement).toBeTruthy();
  });

  it("should render successfully if it AMP component", () => {
    const { baseElement } = render(<AnimeCard data={dummyData_1} isAmp />);
    expect(baseElement).toBeTruthy();
  });

  it("it should render if isMobile props true", () => {
    const { baseElement } = render(<AnimeCard data={dummyData_1} isMobile />);
    expect(baseElement).toBeTruthy();
  });

  it("mock if trailer clicked", () => {
    const mockTrailerClick = jest.fn();
    render(<AnimeCard data={dummyData_1} onTrailerClick={mockTrailerClick} />);
    fireEvent.click(screen.getByTestId("trailer-btn"));

    expect(mockTrailerClick).toBeCalledTimes(1)
    expect(mockTrailerClick).toHaveBeenCalledWith(dummyData_1.trailer);
  });


  it("mock if bookmark clicked", () => {
    const mockBookmarkClick = jest.fn();
    render(<AnimeCard data={dummyData_1} onBookmarkClick={mockBookmarkClick} />);
    fireEvent.click(screen.getByTestId("bookmark-btn"));

    expect(mockBookmarkClick).toBeCalledTimes(1)
  });

  it("it have isDelete props", () => {
    const { baseElement } = render(<AnimeCard data={dummyData_1} isDelete />);
    expect(baseElement).toBeTruthy();
  });

  it("it have isDelete and isMobile props", () => {
    const { baseElement } = render(<AnimeCard data={dummyData_1} isDelete isMobile />);
    expect(baseElement).toBeTruthy();
  });

  it("it don't have bannerImage", () => {
    const { baseElement } = render(<AnimeCard data={dummyData_4} isDelete isMobile />);
    expect(baseElement).toBeTruthy();
  })

  it("it don't have bannerImage and extra large coverImage", () => {
    const { baseElement } = render(<AnimeCard data={dummyData_5} />);
    expect(baseElement).toBeTruthy();
  })

  it("it don't have bannerImage, extra large coverImage and large", () => {
    const { baseElement } = render(<AnimeCard data={dummyData_6} />);
    expect(baseElement).toBeTruthy();
  })

  it("it don't have bannerImage, extra large coverImage, large, and medium ", () => {
    const { baseElement } = render(<AnimeCard data={dummyData_7} />);
    expect(baseElement).toBeTruthy();
  })

});