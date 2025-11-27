import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from 'sonner';

const courses = [
  {
    id: 1,
    title: 'Английский язык',
    category: 'Языки',
    level: 'Все уровни',
    duration: '6 месяцев',
    price: '8 000 ₽/мес',
    description: 'Комплексное изучение английского языка с носителями',
    schedule: ['ПН, СР 18:00', 'ВТ, ЧТ 19:00', 'СБ 10:00']
  },
  {
    id: 2,
    title: 'Программирование Python',
    category: 'IT',
    level: 'Начинающий',
    duration: '4 месяца',
    price: '12 000 ₽/мес',
    description: 'От основ до создания собственных проектов',
    schedule: ['ВТ, ЧТ 18:00', 'СБ 14:00']
  },
  {
    id: 3,
    title: 'Математика',
    category: 'Школьные предметы',
    level: '5-11 класс',
    duration: '9 месяцев',
    price: '6 000 ₽/мес',
    description: 'Подготовка к ОГЭ и ЕГЭ, углубленное изучение',
    schedule: ['ПН, СР 16:00', 'ВТ, ЧТ 17:00', 'СБ 12:00']
  },
  {
    id: 4,
    title: 'Графический дизайн',
    category: 'Творчество',
    level: 'Начинающий',
    duration: '5 месяцев',
    price: '10 000 ₽/мес',
    description: 'Adobe Photoshop, Illustrator, Figma',
    schedule: ['СР, ПТ 19:00', 'ВС 11:00']
  },
  {
    id: 5,
    title: 'Подготовка к школе',
    category: 'Дети',
    level: '5-7 лет',
    duration: '8 месяцев',
    price: '5 000 ₽/мес',
    description: 'Комплексная подготовка к первому классу',
    schedule: ['ПН, СР, ПТ 10:00', 'ВТ, ЧТ 11:00']
  },
  {
    id: 6,
    title: 'Бизнес-английский',
    category: 'Профессиональное',
    level: 'Intermediate+',
    duration: '3 месяца',
    price: '15 000 ₽/мес',
    description: 'Деловая лексика, переговоры, презентации',
    schedule: ['ВТ, ЧТ 20:00', 'СБ 16:00']
  }
];

const teachers = [
  {
    id: 1,
    name: 'Анна Петрова',
    subject: 'Английский язык',
    experience: '12 лет',
    education: 'МГУ, филологический факультет',
    description: 'Сертифицированный преподаватель, CELTA, опыт работы в Великобритании',
    avatar: 'АП'
  },
  {
    id: 2,
    name: 'Дмитрий Соколов',
    subject: 'Программирование',
    experience: '8 лет',
    education: 'МФТИ, прикладная математика',
    description: 'Senior developer, автор онлайн-курсов, наставник в IT-компаниях',
    avatar: 'ДС'
  },
  {
    id: 3,
    name: 'Елена Волкова',
    subject: 'Математика',
    experience: '15 лет',
    education: 'МПГУ, математика и физика',
    description: 'Эксперт ЕГЭ, победители олимпиад среди учеников',
    avatar: 'ЕВ'
  },
  {
    id: 4,
    name: 'Михаил Кузнецов',
    subject: 'Графический дизайн',
    experience: '10 лет',
    education: 'МГХПА им. Строганова',
    description: 'Практикующий дизайнер, работы для международных брендов',
    avatar: 'МК'
  }
];

const reviews = [
  {
    id: 1,
    author: 'Мария С.',
    course: 'Английский язык',
    rating: 5,
    text: 'Отличные преподаватели! За полгода значительно улучшила разговорный английский. Занятия проходят интересно и динамично.',
    date: '2 недели назад'
  },
  {
    id: 2,
    author: 'Алексей К.',
    course: 'Программирование Python',
    rating: 5,
    text: 'Прекрасный курс для начинающих. Все объясняется понятно, много практики. Уже через 2 месяца написал свой первый проект!',
    date: '1 месяц назад'
  },
  {
    id: 3,
    author: 'Ольга Д.',
    course: 'Математика',
    rating: 5,
    text: 'Сын занимается подготовкой к ЕГЭ. Результаты пробных экзаменов выросли с 60 до 85 баллов! Спасибо преподавателю!',
    date: '3 недели назад'
  }
];

const Index = () => {
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedTeacher, setSelectedTeacher] = useState('');
  const [selectedSchedule, setSelectedSchedule] = useState('');
  const [activeSection, setActiveSection] = useState('home');
  const [bookingDialogOpen, setBookingDialogOpen] = useState(false);

  const handleBooking = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name');
    const phone = formData.get('phone');
    
    if (selectedCourse && selectedSchedule && name && phone) {
      toast.success('Заявка отправлена!', {
        description: 'Мы свяжемся с вами в ближайшее время'
      });
      setBookingDialogOpen(false);
      setSelectedCourse('');
      setSelectedTeacher('');
      setSelectedSchedule('');
    }
  };

  const scrollToSection = (section: string) => {
    setActiveSection(section);
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="GraduationCap" size={32} className="text-primary" />
              <span className="text-2xl font-bold text-secondary">EduCenter</span>
            </div>
            <div className="hidden md:flex gap-6">
              {['Главная', 'Курсы', 'Преподаватели', 'Расписание', 'Цены', 'Отзывы', 'Контакты'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`font-medium transition-colors hover:text-primary ${
                    activeSection === item.toLowerCase() ? 'text-primary' : 'text-secondary'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
            <Dialog open={bookingDialogOpen} onOpenChange={setBookingDialogOpen}>
              <DialogTrigger asChild>
                <Button size="lg" className="hidden md:flex gap-2">
                  <Icon name="Calendar" size={20} />
                  Записаться
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Запись на курс</DialogTitle>
                  <DialogDescription>
                    Заполните форму, и мы свяжемся с вами для подтверждения записи
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleBooking} className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Ваше имя</Label>
                    <Input id="name" name="name" placeholder="Иван Иванов" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Телефон</Label>
                    <Input id="phone" name="phone" type="tel" placeholder="+7 (999) 123-45-67" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="course">Выберите курс</Label>
                    <Select value={selectedCourse} onValueChange={setSelectedCourse} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите курс" />
                      </SelectTrigger>
                      <SelectContent>
                        {courses.map((course) => (
                          <SelectItem key={course.id} value={course.title}>
                            {course.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  {selectedCourse && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="teacher">Выберите преподавателя</Label>
                        <Select value={selectedTeacher} onValueChange={setSelectedTeacher}>
                          <SelectTrigger>
                            <SelectValue placeholder="Любой преподаватель" />
                          </SelectTrigger>
                          <SelectContent>
                            {teachers
                              .filter((t) => 
                                courses.find((c) => c.title === selectedCourse)?.category === 'Языки' 
                                  ? t.subject.includes('Английский')
                                  : t.subject.toLowerCase().includes(selectedCourse.toLowerCase().split(' ')[0])
                              )
                              .map((teacher) => (
                                <SelectItem key={teacher.id} value={teacher.name}>
                                  {teacher.name} - {teacher.experience}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="schedule">Выберите время</Label>
                        <Select value={selectedSchedule} onValueChange={setSelectedSchedule} required>
                          <SelectTrigger>
                            <SelectValue placeholder="Выберите удобное время" />
                          </SelectTrigger>
                          <SelectContent>
                            {courses
                              .find((c) => c.title === selectedCourse)
                              ?.schedule.map((time, idx) => (
                                <SelectItem key={idx} value={time}>
                                  {time}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </>
                  )}
                  <Button type="submit" className="w-full" size="lg">
                    Отправить заявку
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </nav>
      </header>

      <section id="главная" className="relative py-20 md:py-32 bg-gradient-to-br from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-secondary">
              Образование, которое меняет жизнь
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8">
              Профессиональные курсы для детей и взрослых. Более 15 лет опыта в сфере образования.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 py-6" onClick={() => scrollToSection('курсы')}>
                <Icon name="BookOpen" size={20} className="mr-2" />
                Выбрать курс
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6" onClick={() => scrollToSection('контакты')}>
                <Icon name="Phone" size={20} className="mr-2" />
                Связаться с нами
              </Button>
            </div>
            <div className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">15+</div>
                <div className="text-sm text-muted-foreground">лет опыта</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">2000+</div>
                <div className="text-sm text-muted-foreground">выпускников</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">50+</div>
                <div className="text-sm text-muted-foreground">программ</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="курсы" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-secondary">Наши курсы</h2>
            <p className="text-xl text-muted-foreground">
              Широкий выбор программ для любого возраста и уровня подготовки
            </p>
          </div>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-5 mb-8">
              <TabsTrigger value="all">Все</TabsTrigger>
              <TabsTrigger value="languages">Языки</TabsTrigger>
              <TabsTrigger value="it">IT</TabsTrigger>
              <TabsTrigger value="school">Школа</TabsTrigger>
              <TabsTrigger value="creative">Творчество</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="space-y-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course) => (
                  <Card key={course.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between mb-2">
                        <Badge variant="secondary">{course.category}</Badge>
                        <span className="text-2xl font-bold text-primary">{course.price}</span>
                      </div>
                      <CardTitle className="text-xl">{course.title}</CardTitle>
                      <CardDescription>{course.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-sm">
                          <Icon name="Signal" size={16} className="text-muted-foreground" />
                          <span>{course.level}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Icon name="Clock" size={16} className="text-muted-foreground" />
                          <span>{course.duration}</span>
                        </div>
                      </div>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className="w-full" onClick={() => setSelectedCourse(course.title)}>
                            Записаться на курс
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[500px]">
                          <DialogHeader>
                            <DialogTitle>Запись на курс: {course.title}</DialogTitle>
                            <DialogDescription>
                              Заполните форму для записи на курс
                            </DialogDescription>
                          </DialogHeader>
                          <form onSubmit={handleBooking} className="space-y-4 mt-4">
                            <div className="space-y-2">
                              <Label htmlFor={`name-${course.id}`}>Ваше имя</Label>
                              <Input id={`name-${course.id}`} name="name" placeholder="Иван Иванов" required />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor={`phone-${course.id}`}>Телефон</Label>
                              <Input id={`phone-${course.id}`} name="phone" type="tel" placeholder="+7 (999) 123-45-67" required />
                            </div>
                            <div className="space-y-2">
                              <Label>Расписание</Label>
                              <Select value={selectedSchedule} onValueChange={setSelectedSchedule} required>
                                <SelectTrigger>
                                  <SelectValue placeholder="Выберите удобное время" />
                                </SelectTrigger>
                                <SelectContent>
                                  {course.schedule.map((time, idx) => (
                                    <SelectItem key={idx} value={time}>
                                      {time}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            <Button type="submit" className="w-full" size="lg">
                              Отправить заявку
                            </Button>
                          </form>
                        </DialogContent>
                      </Dialog>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <section id="преподаватели" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-secondary">Наши преподаватели</h2>
            <p className="text-xl text-muted-foreground">
              Опытные специалисты с профильным образованием
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teachers.map((teacher) => (
              <Card key={teacher.id} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <Avatar className="w-24 h-24">
                      <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                        {teacher.avatar}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <CardTitle className="text-xl">{teacher.name}</CardTitle>
                  <CardDescription className="text-base font-medium text-primary">
                    {teacher.subject}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center justify-center gap-2 text-sm">
                    <Icon name="Award" size={16} className="text-muted-foreground" />
                    <span>{teacher.experience}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{teacher.education}</p>
                  <p className="text-sm mt-3">{teacher.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="расписание" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-secondary">Расписание занятий</h2>
            <p className="text-xl text-muted-foreground">
              Удобное время для детей и взрослых
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-6">
                  {courses.map((course) => (
                    <div key={course.id} className="border-b last:border-0 pb-6 last:pb-0">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                          <h3 className="font-semibold text-lg mb-2">{course.title}</h3>
                          <div className="flex flex-wrap gap-2">
                            {course.schedule.map((time, idx) => (
                              <Badge key={idx} variant="outline" className="text-sm">
                                <Icon name="Clock" size={14} className="mr-1" />
                                {time}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <Button variant="outline" onClick={() => {
                          setSelectedCourse(course.title);
                          setBookingDialogOpen(true);
                        }}>
                          Записаться
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="цены" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-secondary">Стоимость обучения</h2>
            <p className="text-xl text-muted-foreground">
              Прозрачные цены без скрытых платежей
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-center text-2xl">Базовый</CardTitle>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary">5 000 ₽</div>
                  <div className="text-sm text-muted-foreground">в месяц</div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <Icon name="Check" size={20} className="text-primary" />
                  <span>8 занятий в месяц</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Check" size={20} className="text-primary" />
                  <span>Группы до 8 человек</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Check" size={20} className="text-primary" />
                  <span>Доступ к материалам</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Check" size={20} className="text-primary" />
                  <span>Сертификат по окончании</span>
                </div>
                <Button className="w-full mt-4" variant="outline" onClick={() => setBookingDialogOpen(true)}>
                  Выбрать план
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-primary shadow-lg scale-105">
              <CardHeader>
                <div className="flex justify-center mb-2">
                  <Badge className="bg-primary">Популярный</Badge>
                </div>
                <CardTitle className="text-center text-2xl">Стандарт</CardTitle>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary">8 000 ₽</div>
                  <div className="text-sm text-muted-foreground">в месяц</div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <Icon name="Check" size={20} className="text-primary" />
                  <span>12 занятий в месяц</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Check" size={20} className="text-primary" />
                  <span>Группы до 6 человек</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Check" size={20} className="text-primary" />
                  <span>Все материалы включены</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Check" size={20} className="text-primary" />
                  <span>Домашние задания</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Check" size={20} className="text-primary" />
                  <span>Сертификат + портфолио</span>
                </div>
                <Button className="w-full mt-4" onClick={() => setBookingDialogOpen(true)}>
                  Выбрать план
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-center text-2xl">Премиум</CardTitle>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary">12 000 ₽</div>
                  <div className="text-sm text-muted-foreground">в месяц</div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <Icon name="Check" size={20} className="text-primary" />
                  <span>16 занятий в месяц</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Check" size={20} className="text-primary" />
                  <span>Мини-группы до 4 человек</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Check" size={20} className="text-primary" />
                  <span>Индивидуальный подход</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Check" size={20} className="text-primary" />
                  <span>Персональный куратор</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Check" size={20} className="text-primary" />
                  <span>Помощь в трудоустройстве</span>
                </div>
                <Button className="w-full mt-4" variant="outline" onClick={() => setBookingDialogOpen(true)}>
                  Выбрать план
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="отзывы" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-secondary">Отзывы учеников</h2>
            <p className="text-xl text-muted-foreground">
              Что говорят наши студенты
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {reviews.map((review) => (
              <Card key={review.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle className="text-lg">{review.author}</CardTitle>
                    <div className="flex gap-1">
                      {[...Array(review.rating)].map((_, i) => (
                        <Icon key={i} name="Star" size={16} className="fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                  <CardDescription>{review.course}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-3">{review.text}</p>
                  <p className="text-xs text-muted-foreground">{review.date}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="контакты" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-secondary">Контакты</h2>
            <p className="text-xl text-muted-foreground">
              Свяжитесь с нами удобным способом
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Наши контакты</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <Icon name="MapPin" size={20} className="text-primary mt-1" />
                  <div>
                    <div className="font-medium">Адрес</div>
                    <div className="text-sm text-muted-foreground">
                      г. Москва, ул. Примерная, д. 123, офис 45
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="Phone" size={20} className="text-primary mt-1" />
                  <div>
                    <div className="font-medium">Телефон</div>
                    <div className="text-sm text-muted-foreground">
                      +7 (495) 123-45-67<br />
                      +7 (926) 999-88-77
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="Mail" size={20} className="text-primary mt-1" />
                  <div>
                    <div className="font-medium">Email</div>
                    <div className="text-sm text-muted-foreground">
                      info@educenter.ru<br />
                      support@educenter.ru
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="Clock" size={20} className="text-primary mt-1" />
                  <div>
                    <div className="font-medium">Режим работы</div>
                    <div className="text-sm text-muted-foreground">
                      Пн-Пт: 9:00 - 21:00<br />
                      Сб-Вс: 10:00 - 18:00
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Напишите нам</CardTitle>
                <CardDescription>
                  Мы ответим в течение 24 часов
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4" onSubmit={(e) => {
                  e.preventDefault();
                  toast.success('Сообщение отправлено!');
                }}>
                  <div className="space-y-2">
                    <Label htmlFor="contact-name">Имя</Label>
                    <Input id="contact-name" placeholder="Ваше имя" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-email">Email</Label>
                    <Input id="contact-email" type="email" placeholder="your@email.com" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Сообщение</Label>
                    <Input id="message" placeholder="Ваш вопрос" required />
                  </div>
                  <Button type="submit" className="w-full">
                    Отправить сообщение
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <footer className="bg-secondary text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Icon name="GraduationCap" size={28} className="text-primary" />
                <span className="text-xl font-bold">EduCenter</span>
              </div>
              <p className="text-sm text-gray-300">
                Образовательный центр для детей и взрослых с 2009 года
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Курсы</h3>
              <div className="space-y-2 text-sm text-gray-300">
                <div>Языки</div>
                <div>Программирование</div>
                <div>Школьные предметы</div>
                <div>Творчество</div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Информация</h3>
              <div className="space-y-2 text-sm text-gray-300">
                <div>О центре</div>
                <div>Преподаватели</div>
                <div>Лицензии</div>
                <div>Вакансии</div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Связь</h3>
              <div className="space-y-2 text-sm text-gray-300">
                <div>+7 (495) 123-45-67</div>
                <div>info@educenter.ru</div>
                <div className="flex gap-4 mt-4">
                  <Icon name="Instagram" size={20} className="cursor-pointer hover:text-primary" />
                  <Icon name="Facebook" size={20} className="cursor-pointer hover:text-primary" />
                  <Icon name="Youtube" size={20} className="cursor-pointer hover:text-primary" />
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
            © 2024 EduCenter. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
