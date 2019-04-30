const sharp = require('sharp'),
    path = require('path'),
    fs = require('fs'),
    src_dir = path.resolve(__dirname, '../src/images/'),
    final_dir = path.resolve(__dirname, '../public/images');

let makeFile = (file, suffix, size) => {

    let src = path.resolve(src_dir, file), // откуда читаем
        small = path.resolve(final_dir, file.replace(/\.([^.]+)$/, `_${suffix}.$1`)); // куда сохраняем

    sharp(src)
        .jpeg({
            quality:     80, // сжимаем изображение
            progressive: true
        })
        .resize({
            width:              size, // меняем размер
            withoutEnlargement: true // не увеличиваем маленькие
        })
        .toFile(small, (err, info) => {
            if (err) throw err;
        });
};

// создаем папку
fs.mkdir(final_dir, { recursive: true }, err => {
    if (err) console.log(err);

    // ищем файлы в папке с изображениями
    fs.readdir(src_dir, (err, files) => {
        if (err) throw err;

        files.forEach(file => {
                console.log(`Resizing image ${file} ...`);

                makeFile(file, 'normal', 1200);
                makeFile(file, 'small', 400);

            }
        );
    });
});

