export type Store = {
  name: string;
  image: string;
  description: string;
  address: string;
  status: boolean;
  rectangularImage: string;
};

export const stores: Store[] = [
  {
    name: "WHSmith",
    image: "/images/stores/retailer_whsmith-colour.jpg",
    rectangularImage: "/images/stores/rectangular/WHSmith-rectangular.jpg",
    description:
      "WHSmith is one of the UK's leading retailers and aims to be its most popular bookseller, stationer and newsagent. A perennial favourite amongst High Street stores, you can find a wide range of newspapers, magazines, stationery, books and entertainment products. There are also tasty sandwiches and a selection of cold drinks to choose from.",
    address: "33a Silbury Blvd, Milton Keynes MK9 3ES",
    status: true,
  },
  {
    name: "hmv",
    image: "/images/stores/hmv-colour.jpg",
    description:
      "Feed your love of art at AC Framing where a fantastic selection of original and limited edition art prints awaits you. We also offer a bespoke framing service.",
    address: "33a Silbury Blvd, Milton Keynes MK9 3ES",
    status: true,
    rectangularImage: "/images/stores/rectangular/hmv-rectangular.jpg",
  },
  {
    name: "HSamuel",
    image: "/images/stores/hsamuel-colour.jpg",
    description:
      "1862. H. Samuel's story begins. Harriet Samuel turned the small family watch-making store into a mail-order business, with one goal: to make quality jewellery and watches accessible to everyone. Today, across the UK, H. Samuel is known and loved for diamonds andwatchesat attainable prices and trend-led fashion brands.",
    address: "33a Silbury Blvd, Milton Keynes MK9 3ES",
    status: true,
    rectangularImage: "/images/stores/rectangular/hsamuel-rectangular.jpg",
  },
  {
    name: "Game",
    image: "/images/stores/retailer_game-colour.jpg",
    description:
      "Game on Crown Walk stocks a wide range of games for Xbox One, Playstation 4 and Nintendo Switch, as well as accessories, merchandise and more. You can also trade in games, consoles, phones and tablets for cash or store credit.",
    address: "33a Silbury Blvd, Milton Keynes MK9 3ES",
    status: true,
    rectangularImage: "/images/stores/rectangular/game-rectangular.jpg",
  },
  {
    name: "Baseo",
    image: "/images/stores/baseo-colour.jpg",
    description:
      "We buy, sell and trade in a wide range of technology products including mobile phones, game consoles, games, Laptops, MacBook, iMac. computers, Cameras, lenses, monitors, TVs, and Blu-ray DVDs.",
    address: "33a Silbury Blvd, Milton Keynes MK9 3ES",
    status: true,
    rectangularImage: "/images/stores/rectangular/baseo-rectangular.jpg",
  },
  {
    name: "CEX",
    image: "/images/stores/cex-clour.jpg",
    description:
      "CEX buy, sell and exchange a range of technology and entertainment products including mobile phones, video games, DVDs and Blu-ray movies, computers, digital electronics, TVs and monitors.",
    address: "33a Silbury Blvd, Milton Keynes MK9 3ES",
    status: true,
    rectangularImage: "/images/stores/rectangular/cex-rectangular.jpg",
  },
  {
    name: "BeaverBrook",
    image: "/images/stores/beaverbrooks-black.jpg",
    description:
      "Beaverbrooks is a family-owned jewellers established in 1919 with stores across the UK, providing exceptional quality diamonds, jewellery and watches, and top name watch and jewellery brands including TAG Heuer, Gucci, Michael Kors and Links of London.",
    address: "33a Silbury Blvd, Milton Keynes MK9 3ES",
    status: true,
    rectangularImage:
      "/images/stores/rectangular/beeaverbrooks-rectangular.jpg",
  },
];
