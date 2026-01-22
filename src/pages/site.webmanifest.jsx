import checkAndCopyConfig, { getSettings } from "utils/config/config";
import themes from "utils/styles/themes";

export async function getServerSideProps({ res }) {
  checkAndCopyConfig("settings.yaml");
  const settings = getSettings();
  const manifest = settings.manifest || {};

  const [
    tcColor = settings.color || "slate",
    tcTheme = settings.theme || "dark"
  ] = manifest.themeColor.split('-');

    const [
    bgColor = settings.color || "slate",
    bgTheme = settings.theme || "dark"
  ] = manifest.backgroundColor.split('-');

  const webmanifest = {
    name: manifest.name || settings.title || "Homepage",
    short_name: manifest.shortName || settings.title || "Homepage",
    description: manifest.description || 'test',
    icons: manifest.icons || [
      {
        src: "/android-chrome-192x192.png?v=2",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/android-chrome-512x512.png?v=2",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    theme_color: themes[tcColor][tcTheme],
    background_color: themes[bgColor][bgTheme],
    display: manifest.display || "standalone",
    start_url: manifest.startUrl || settings.startUrl || "/",
    shortcuts: manifest.shortcuts,
  };

  res.setHeader("Content-Type", "application/manifest+json");
  res.write(JSON.stringify(webmanifest));
  res.end();

  return {
    props: {},
  };
}

export default function Webmanifest() {
  return null;
}
