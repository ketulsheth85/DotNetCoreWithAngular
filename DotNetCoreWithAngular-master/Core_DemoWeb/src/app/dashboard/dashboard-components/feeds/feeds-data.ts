export interface Feed {
  class: string,
  icon: string,
  title: string,
  path: string,
  count: string
}

export const Feeds: Feed[] = [


  {
    path: '/component/customermaster',
    title: 'Customer',
    icon: 'mdi mdi-home-modern',
    class: 'bg-success',
    count: ''
  },
  {
    path: '/component/locationmaster',
    title: 'Location Master',
    icon: 'mdi mdi-map-marker',
    class: 'bg-warning',
    count: ''
  },
  {
    path: '/component/usermaster',
    title: 'User',
    icon: 'mdi mdi-account',
    class: 'bg-danger',
    count: ''
  },
  {
    path: '/component/productcategory',
    title: 'Asset Category',
    icon: 'mdi mdi-border-all',
    class: 'bg-primary',
    count: ''
  },
  {
    path: '/component/productsubcategory',
    title: 'Asset Sub Category',
    icon: 'mdi mdi-file-tree',
    class: 'bg-info',
    count: ''
  },
  {
    path: '/component/productmaster',
    title: 'Asset Master',
    icon: 'mdi mdi-codepen',
    class: 'bg-success',
    count: ''
  },
  {
    path: '/component/productvideo',
    title: 'Asset Video',
    icon: 'mdi mdi-video',
    class: 'bg-danger',
    count: ''
  },
  {
    path: '/component/documentcategory',
    title: 'Document Category',
    icon: 'mdi mdi-file-document-box',
    class: 'bg-primary',
    count: ''
  },
  {
    path: '/component/productdocument',
    title: 'Asset Document',
    icon: 'mdi mdi-file-document',
    class: 'bg-info',
    count: ''
  },
]
