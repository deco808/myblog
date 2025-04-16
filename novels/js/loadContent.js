// 动态加载章节目录和内容
function loadNovel(chaptersConfigPath) {
    fetch(chaptersConfigPath)
        .then(response => {
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return response.json();
        })
        .then(data => {
            const chapterList = document.getElementById('chapterList');
            const chapterContent = document.getElementById('chapterContent');

            // 清空目录和内容
            chapterList.innerHTML = '';
            chapterContent.innerHTML = '<h2>章节内容加载中...</h2>';

            // 动态生成目录
            data.chapters.forEach((chapter, index) => {
                const chapterItem = document.createElement('li');
                chapterItem.className = 'list-group-item';
                chapterItem.innerHTML = `<a href="#" data-file="${chapter.file}">${chapter.title}</a>`;
                chapterItem.addEventListener('click', (e) => {
                    e.preventDefault();
                    loadChapterContent(`../${chapter.file}`);
                });
                chapterList.appendChild(chapterItem);

                // 默认加载第一章
                if (index === 0) {
                    loadChapterContent(`../${chapter.file}`);
                }
            });
        })
        .catch(error => {
            console.error('加载章节目录失败:', error);
            document.getElementById('chapterList').innerHTML = `
                <div class="alert alert-danger">章节目录加载失败，请刷新页面。</div>
            `;
        });
}

// 加载章节内容
function loadChapterContent(filePath) {
    fetch(filePath)
        .then(response => {
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return response.text();
        })
        .then(markdown => {
            document.getElementById('chapterContent').innerHTML = marked.parse(markdown);
        })
        .catch(error => {
            console.error('加载章节内容失败:', error);
            document.getElementById('chapterContent').innerHTML = `
                <div class="alert alert-danger">章节内容加载失败，请重试。</div>
            `;
        });
}