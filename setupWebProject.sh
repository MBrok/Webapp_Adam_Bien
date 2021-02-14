#!/bin/bash
if [ -z ${1} ]
then
    echo "Bitte den Projektnamen angeben!"
    echo "Benutzung: setupWebProject.sh <Projektname>"
    exit 1
elif [ -d ${1} ]
then
    read -p "Das Projekt $1 scheint schon zu existieren. Soll es überschrieben werden? (j/N)"
    if [ "${REPLY}x" = 'jx' ] # Zampano mit dem "x" wegen ordentlicher Meldung, falls einfach Enter gedrückt wird.
    then
        echo "Das Projekt $1 wird gelöscht und neu angelegt."
        rm -r $1
    else
        echo "Dann nicht."
        exit 1
    fi
fi

mkdir $1
cd $1
mkdir src
cd src
echo "body {background-color: #ffafaf;}" >> style.css
echo "console.log(\"$1 lebt!\");" >> app.js
echo "<!DOCTYPE html>" >> index.html
echo "<html>" >> index.html
echo "<head>" >> index.html
echo "    <title>$1</title>" >> index.html
echo "    <link rel=\"stylesheet\" href=\"style.css\">" >> index.html
echo "    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">" >> index.html
echo "</head>" >> index.html
echo "" >> index.html
echo "<body>" >> index.html
echo "    <code>$1</code>" >> index.html
echo "    <script src=\"app.js\"></script>" >> index.html
echo "</body>" >> index.html
echo "</html>" >> index.html
cd ..

#Start-Script anlegen.
echo "#!/bin/sh" >> bsync
echo "browser-sync src -f src --cors" >> bsync
./bsync