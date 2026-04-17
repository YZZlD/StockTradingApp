export default function IsURL(text) {
    try{
        const url = new URL(text);
        return url.protocol === "http:" || url.protocol === "https:";
    } catch(_){
        return false;
    }
}
