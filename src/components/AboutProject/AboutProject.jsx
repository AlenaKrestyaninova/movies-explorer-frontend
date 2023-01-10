import React from 'react';
import '../../blocks/title/title.css';
import './AboutProject.css';

function AboutProject() {

    return (
        <section className="project page__section">
            <a name="project"></a>
            <h2 className="title">О проекте</h2>
            <div className="project__articles">
                <article className="project__article">
                    <h3 className='project__subtitle'>Дипломный проект включал 5 этапов</h3>
                    <p className='project__text'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                </article>
                <article className="project__article">
                    <h3 className='project__subtitle'>На выполнение диплома ушло 5 недель</h3>
                    <p className='project__text'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                </article>
            </div>
            <div className='progress-bar'>
                <div className='progress-bar__item progress-bar__item_backend'>
                    <div className='progress-bar__bar progress-bar__bar_backend'>1 неделя</div>
                    <div className='progress-bar__text progress-bar__text_backend'>Back-end</div>
                </div>
                <div className='progress-bar__item progress-bar__item_frontend'>
                    <div className='progress-bar__bar progress-bar__bar_frontend'>4 недели</div>
                    <div className='progress-bar__text progress-bar__text_frontend'>Front-end</div>
                </div>
            </div>
        </section>
    );
}

export default AboutProject;