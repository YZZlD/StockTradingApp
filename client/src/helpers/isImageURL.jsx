export default function isImageURL(text) {
    return /(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))/i.test(text);
}
